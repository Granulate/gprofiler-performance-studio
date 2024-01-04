# INTEL CONFIDENTIAL
# Copyright (C) 2023 Intel Corporation
# This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
# This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.

import hashlib
import json
import threading
import time
from collections import defaultdict
from datetime import datetime, timedelta
from secrets import token_urlsafe
from typing import Dict, List, Optional, Tuple, Union, Set

from gprofiler_dev.config import INSTANCE_RUNS_LRU_CACHE_LIMIT, PROFILER_PROCESSES_LRU_CACHE_LIMIT
from gprofiler_dev.lru_cache_impl import LRUCache
from gprofiler_dev.postgres import get_postgres_db
from gprofiler_dev.postgres.postgresdb import DBConflict
from gprofiler_dev.postgres.queries import AggregationSQLQueries, SQLQueries
from gprofiler_dev.postgres.schemas import AgentMetadata, CloudProvider, GetServiceResponse

AGENT_RETENTION_HOURS = 24
LAST_SEEN_UPDATES_INTERVAL_MINUTES = 5

METRICS_UPDATES_INTERVAL_MINUTES = 5
SERVICES_LIST_HOURS_INTERVAL = 7 * 24
SERVICES_LIST_HOURS_VISIBLE_INTERVAL = 24 * 30


def generate_token(nbytes) -> str:
    while True:
        token = token_urlsafe(nbytes)
        # Preventing a token generation with a dash prefix.
        # Tokens with such prefixes are not supported by the gProfiler Agent.
        if not token.startswith("-"):
            break
    return token


def round_time(dt, round_to_seconds=60):
    seconds = (dt.replace(tzinfo=None) - dt.min).seconds
    rounding = (seconds + round_to_seconds / 2) // round_to_seconds * round_to_seconds
    return dt + timedelta(0, rounding - seconds, -dt.microsecond)


def get_total_seconds_from_intervals(intervals: List[Tuple[datetime, datetime]]) -> float:
    islands = []
    island_index = 0
    prev_end = None
    for interval in sorted(intervals):
        start, end = interval
        if prev_end is None or start > prev_end:
            islands.append([start, end])
            island_index += 1
        else:
            end = max(islands[island_index-1][1], end)
            islands[island_index-1][1] = end
        prev_end = end
    total_diff = timedelta()
    for island in islands:
        start, end = island
        diff = end - start
        total_diff += diff
    return total_diff.total_seconds()


class Singleton(type):
    _instances: dict = {}
    _lock = threading.Lock()

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            with cls._lock:
                cls._instances[cls] = super(Singleton, cls).__call__(*args, **kwargs)
        return cls._instances[cls]


class DBManager(metaclass=Singleton):
    def __init__(self):
        self.db = get_postgres_db()
        self.machine_types: Dict[Tuple[str, str], int] = {}
        self.machine_types_ids: Dict[int, int] = {}
        self.profiler_versions: Dict[Tuple[int, int, int], int] = {}
        self.profiler_run_environments: Dict[Tuple[str, int, str], int] = {}
        self.machines: Dict[Tuple[int, int, int], int] = {}
        self.oses: Dict[Tuple[str, str, str], int] = {}
        self.kernels: Dict[Tuple[int, str, str, str], int] = {}
        self.libcs: Dict[Tuple[str, str], int] = {}
        self.services: Dict[Tuple[int], str] = {}
        self.services_visibility: Dict[Tuple[int, int], str] = {}
        self.deployments: Dict[Tuple[int, str], int] = {}
        self.instance_runs = LRUCache(INSTANCE_RUNS_LRU_CACHE_LIMIT)
        self.profiler_processes = LRUCache(PROFILER_PROCESSES_LRU_CACHE_LIMIT)

        self.last_seen_updates: Dict[str : time.time] = defaultdict(
            lambda: time.time() - (LAST_SEEN_UPDATES_INTERVAL_MINUTES + 1) * 60
        )

    def get_libc(self, libc_type, libc_version):
        key = (libc_type, libc_version)
        if key not in self.libcs:
            libc_id = self.db.add_or_fetch(SQLQueries.SELECT_LIBC, key, SQLQueries.INSERT_LIBC)
            self.libcs[key] = libc_id
        return self.libcs[key]

    def get_profiler_process_id(
        self,
        instance_run: int,
        profiler_version: int,
        pid: int,
        spawn_local_time: datetime,
        spawn_uptime: int,
        public_ip,
        private_ip,
        hostname,
        service_id,
        profiler_run_environment_id,
        run_arguments: dict,
        extra_cache: bool,
    ) -> int:
        key = (instance_run, profiler_version, pid, spawn_local_time)
        value = (
            instance_run,
            profiler_version,
            pid,
            spawn_local_time,
            spawn_uptime,
            public_ip,
            private_ip,
            hostname,
            service_id,
            profiler_run_environment_id,
            json.dumps(run_arguments),
        )
        is_new_process = False
        cmp_value = None
        if extra_cache:
            cmp_value = self.profiler_processes.get(key)
        if cmp_value is None:
            process_id, is_new_process = self.db.execute(
                SQLQueries.ADD_OR_FETCH_PROFILER_PROCESS, value, has_value=True, one_value=False
            )

            if process_id is None:
                raise DBConflict("ProfilerProcesses", key, value, process_id)
            if process_id < 0:
                process_id *= -1
                self._warn_conflict("ProfilerProcesses", process_id, "db")
            cmp_value = (process_id, *value)
            if extra_cache:
                self.profiler_processes.put(key, cmp_value)

        if not is_new_process:
            if time.time() - self.last_seen_updates[cmp_value[0]] > LAST_SEEN_UPDATES_INTERVAL_MINUTES * 60:
                self.db.execute(SQLQueries.UPDATE_PROFILER_PROCESS_LAST_SEEN_TIME, (cmp_value[0],), has_value=False)

                self.last_seen_updates[cmp_value[0]] = time.time()
        if value != cmp_value[1:]:
            self._warn_conflict("ProfilerProcesses", cmp_value[0], "cache")
        return cmp_value[0]

    def get_profiler_version_id(self, major: int, minor: int, patch: int) -> int:
        key = (major, minor, patch)
        value = (major, minor, patch, major * 1000000 + minor * 1000 + patch)
        if key not in self.profiler_versions:
            self.profiler_versions[key] = self.db.add_or_fetch(
                SQLQueries.SELECT_PROFILER_AGENT_VERSION, key, SQLQueries.INSERT_PROFILER_AGENT_VERSION, value
            )
        return self.profiler_versions[key]

    def get_profiler_run_environment_id(self, python_version, libc_id, run_mode) -> int:
        key = (python_version, libc_id, run_mode)
        if key not in self.profiler_versions:
            self.profiler_run_environments[key] = self.db.add_or_fetch(
                SQLQueries.SELECT_PROFILER_RUN_ENVIRONMENTS, key, SQLQueries.INSERT_PROFILER_RUN_ENVIRONMENTS
            )
        return self.profiler_run_environments[key]

    def register_profiler_process(
        self, agent_metadata: AgentMetadata, instance_run: int, service_id: int, extra_cache: bool
    ) -> int:
        libc_id = self.get_libc(agent_metadata.libc_type, agent_metadata.libc_version)
        major, minor, patch = agent_metadata.agent_version.split(".")
        patch = patch.split("-")[0]  # Remove any suffix, a workaround for test builds that broke the data ingestion
        profiler_version = self.get_profiler_version_id(int(major), int(minor), int(patch))
        profiler_run_environment_id = self.get_profiler_run_environment_id(
            agent_metadata.python_version, libc_id, agent_metadata.run_mode
        )
        pid = agent_metadata.pid
        spawn_local_time = agent_metadata.spawn_time
        spawn_uptime = agent_metadata.spawn_uptime_ms
        return self.get_profiler_process_id(
            instance_run,
            profiler_version,
            pid,
            spawn_local_time,
            spawn_uptime,
            agent_metadata.public_ip,
            agent_metadata.private_ip,
            agent_metadata.hostname,
            service_id,
            profiler_run_environment_id,
            agent_metadata.run_arguments,
            extra_cache,
        )

    def _warn_conflict(self, table: str, db_id: int, origin: str):
        message = f"Ignored DB conflict in {table} for db_id {db_id} (in {origin})"
        self.db.logger.warning(message)

    def get_instance_run_id(
        self,
        instance: int,
        boot_time: datetime,
        machine: int,
        kernel: int,
        metadata: Optional[int],
        extra_cache: bool,
    ) -> int:
        key = (instance, boot_time)
        value = (instance, boot_time, machine, kernel, metadata)
        cmp_value = None
        if extra_cache:
            cmp_value = self.instance_runs.get(key)
        if cmp_value is None:
            db_id, is_new_instance_run = self.db.execute(
                SQLQueries.ADD_OR_FETCH_INSTANCE_RUN, value, has_value=True, one_value=False
            )
            if db_id is None:
                raise DBConflict("InstanceRuns", key, value, db_id)
            if db_id < 0:
                db_id *= -1
                self._warn_conflict("InstanceRuns", db_id, "db")
            cmp_value = (db_id, *value)
            if extra_cache:
                self.instance_runs.put(key, cmp_value)

        # we ignore conflicts in metadata, notify conflicts in kernel and fix conflicts in machine
        if value[:-1] != cmp_value[1:-1]:
            other_db_id, other_instance, other_boot_time, other_machine, other_kernel, other_metadata = cmp_value
            if instance == other_instance and boot_time == other_boot_time and kernel == other_kernel:
                machine_type = self.machine_types_ids.get(machine)
                other_machine_type = self.machine_types_ids.get(other_machine)
                if machine_type != 1 and other_machine_type == 1 and other_metadata is None:
                    if extra_cache:
                        self.instance_runs.put(key, (other_db_id, *value))
                    self.db.execute(
                        SQLQueries.FIX_INSTANCE_RUN_MACHINE, (machine, metadata, other_db_id), has_value=False
                    )
                    return other_db_id
                elif machine_type == 1 and other_machine_type != 1 and metadata is None:
                    # silently ignore conflict since DB data is correct and connected agent's metadata failed to fetch
                    return cmp_value[0]
            self._warn_conflict("InstanceRuns", cmp_value[0], "cache")
        return cmp_value[0]

    def get_instance(self, agent_id: str, identifier: Optional[str]) -> int:
        key = (agent_id, identifier)
        db_id = self.db.execute(SQLQueries.ADD_OR_FETCH_INSTANCE, key)
        if db_id is not None and db_id < 0:  # If a new instance was inserted
            db_id *= -1
        return db_id

    def get_service_by_id(self, service_id: int) -> str:
        key = (service_id, )
        if key not in self.services:
            service = self.db.execute(SQLQueries.SELECT_SERVICE_NAME_BY_ID, key)
            self.services[key] = service
        return self.services[key]

    def get_service_sample_threshold_by_id(self, service_id: int) -> float:
        key = (service_id, )
        rv = self.db.execute(SQLQueries.SELECT_SERVICE_SAMPLE_THRESHOLD_BY_ID, key)
        return 0 if rv is None else rv

    def get_or_create_service(
        self,
        service_name: str,
        service_env_type: Optional[str] = None,
        create: bool = True,
        is_new_indication: bool = True
    ) -> int:
        key = (service_name, )
        value = (service_name, service_env_type)
        if create:
            db_id = self.db.execute(SQLQueries.ADD_OR_FETCH_SERVICE, value)
            if is_new_indication:
                return db_id
            return abs(db_id)
        return self.db.execute(SQLQueries.SELECT_SERVICE, key)

    def get_service(self, service_name: str) -> int:
        return self.db.execute(SQLQueries.SELECT_SERVICE, (service_name, ))

    def get_snapshot(self, snapshot_id: int) -> Optional[List[Dict]]:
        values = {"snapshot_id": snapshot_id}
        return self.db.execute(
            AggregationSQLQueries.GET_SNAPSHOT, values, one_value=False, return_dict=True, fetch_all=True
        )

    def create_snapshot(
        self,
        service_id: int,
        filter_content: Optional[str],
        start_time: datetime,
        end_time: datetime,
        frames: List,
    ) -> Optional[str]:

        values = {
            "service_id": service_id,
            "start_time": start_time,
            "end_time": end_time,
            "filter_content": filter_content,
        }
        snapshot_id = self.db.execute(SQLQueries.INSERT_SNAPSHOT, values)
        frame_query_values = [(snapshot_id, frame.level, frame.start, frame.duration) for frame in frames]
        self.db.execute(SQLQueries.INSERT_FRAME, frame_query_values, execute_values=True)
        return snapshot_id

    def get_deployment(self, cluster_id: int, service_name: str, create: bool = True) -> Optional[int]:
        cluster_service_name = self.get_service_by_id(cluster_id)
        if cluster_service_name is None:
            return
        namespace = None
        deployment_name = service_name
        if create:
            if "_" in service_name:
                deployment_name, namespace = service_name.split("_", 1)
        service_name = f"{cluster_service_name}.{deployment_name}"
        key = (cluster_id, service_name)
        values = (cluster_id, service_name, namespace)

        if create:
            if key not in self.deployments:
                db_id = self.db.execute(SQLQueries.ADD_OR_FETCH_DEPLOYMENT, values)
                self.deployments[key] = abs(db_id)
                return self.deployments[key]
        else:
            if key not in self.deployments:
                self.deployments[key] = self.db.execute(SQLQueries.SELECT_DEPLOYMENT, key)
        return self.deployments[key]

    def get_metadata_id(self, meta: dict) -> Union[None, int]:
        if len(meta) == 0:
            return None

        meta_json = json.dumps(meta)
        hash_meta = hashlib.md5(meta_json.encode("utf-8")).hexdigest()
        key = (meta_json, hash_meta)
        return self.db.add_or_fetch(
            SQLQueries.SELECT_INSTANCE_CLOUD_METADATA, key, SQLQueries.INSERT_INSTANCE_CLOUD_METADATA
        )

    def get_kernel_id(self, os: int, release: str, version: str, hardware_type: Optional[str]) -> int:
        key = (os, release, version, hardware_type if hardware_type is not None else "")
        if key not in self.kernels:
            self.kernels[key] = self.db.add_or_fetch(SQLQueries.SELECT_KERNEL, key, SQLQueries.INSERT_KERNEL)
        return self.kernels[key]

    def get_os_id(self, system_name: str, name: str, release: str) -> int:
        key = (system_name, name if name is not None else "", release if release is not None else "")
        if key not in self.oses:
            self.oses[key] = self.db.add_or_fetch(SQLQueries.SELECT_OS, key, SQLQueries.INSERT_OS)
        return self.oses[key]

    def get_machine_type_id(self, provider: str, name: Optional[str]) -> int:
        key = (provider, name if name is not None else "")
        if key not in self.machine_types:
            self.machine_types[key] = self.db.add_or_fetch(
                SQLQueries.SELECT_MACHINE_TYPE, key, SQLQueries.INSERT_MACHINE_TYPE
            )
        return self.machine_types[key]

    def get_machine_id(self, provider: str, name: Optional[str], processors: int, memory: int) -> int:
        machine_type = self.get_machine_type_id(provider, name)
        key = (machine_type, processors, memory)
        if key not in self.machines:
            db_id = self.db.add_or_fetch(SQLQueries.SELECT_MACHINE, key, SQLQueries.INSERT_MACHINE)
            self.machines[key] = db_id
            self.machine_types_ids[db_id] = machine_type
        return self.machines[key]

    def register_instance_run(self, agent_metadata: AgentMetadata, instance, extra_cache: bool):
        time_since_boot = timedelta(milliseconds=agent_metadata.spawn_uptime_ms)
        time_since_agent_spawn = agent_metadata.current_time - agent_metadata.spawn_time
        boot_time = agent_metadata.current_time - time_since_agent_spawn - time_since_boot
        instance_type = self._get_instance_type(agent_metadata)
        machine = self.get_machine_id(
            agent_metadata.cloud_provider, instance_type, agent_metadata.processors, agent_metadata.memory_capacity_mb
        )
        os = self.get_os_id(agent_metadata.system_name, agent_metadata.os_name, agent_metadata.os_release)
        kernel = self.get_kernel_id(
            os, agent_metadata.kernel_release, agent_metadata.kernel_version, agent_metadata.hardware_type
        )
        metadata = {**(agent_metadata.cloud_info or {})}
        if agent_metadata.big_data:
            metadata["big_data"] = agent_metadata.big_data
        metadata_id = self.get_metadata_id(metadata) if metadata else None
        return self.get_instance_run_id(instance, round_time(boot_time), machine, kernel, metadata_id, extra_cache)

    @staticmethod
    def _get_instance_type(agent_metadata: AgentMetadata) -> str:
        instance_type = agent_metadata.instance_type
        if agent_metadata.cloud_provider == CloudProvider.GCP.value:
            components = instance_type.split("/")
            if len(components) == 4 and components[0] == "projects" and components[2] == "machineTypes":
                instance_type = components[3]

        return instance_type

    def get_service_by_profiler_process_id(self, process_id: int) -> int:
        return self.db.execute(SQLQueries.GET_SERVICE_ID_BY_PROCESS_ID, (process_id,))

    def add_service_data(
        self,
        service_name: str,
        agent_metadata: AgentMetadata,
        extra_cache: bool,
        service_env_type: str
    ) -> GetServiceResponse:
        service_id = self.get_or_create_service(service_name, service_env_type, is_new_indication=True)

        does_service_exist = service_id > 0
        service_id = abs(service_id)
        cloud_instance_id = agent_metadata.cloud_info.get("instance_id")
        instance_id = self.get_instance(agent_metadata.mac_address, cloud_instance_id)
        instance_run = self.register_instance_run(agent_metadata, instance_id, extra_cache)
        profiler_process_id = self.register_profiler_process(agent_metadata, instance_run, service_id, extra_cache)
        return GetServiceResponse(
            service_id=service_id, profiler_process_id=profiler_process_id, does_service_exist=does_service_exist
        )

    def get_nodes_cores_summary(
        self,
        service_id: int,
        start_time: datetime,
        end_time: datetime,
        ignore_zeros: bool,
        hostname: Optional[str],
    ) -> Dict:
        total_seconds = (end_time - start_time).total_seconds()

        if ignore_zeros:
            res = self.db.execute(
                """
                        SELECT GREATEST(ProfilerProcesses.ts, %(start_time)s) as first_seen,
                               LEAST(ProfilerProcesses.last_seen, %(end_time)s) as last_seen
                        FROM ProfilerProcesses
                        INNER JOIN InstanceRuns ON InstanceRuns.ID = ProfilerProcesses.instance_run
                        INNER JOIN Machines ON Machines.ID = InstanceRuns.machine
                        WHERE ProfilerProcesses.last_seen >= %(start_time)s AND
                              ProfilerProcesses.ts < %(end_time)s AND
                              ProfilerProcesses.service = %(service_id)s
                        """,
                {"service_id": service_id, "start_time": start_time, "end_time": end_time},
                one_value=False,
                return_dict=True,
                fetch_all=True
            )
            if not res:
                return res
            intervals = [(elem["first_seen"], elem["last_seen"]) for elem in res]
            total_seconds = get_total_seconds_from_intervals(intervals)

        values["total_seconds"] = total_seconds
        if hostname:
            values["hostname"] = hostname
            return self.db.execute(
                AggregationSQLQueries.NODES_CORES_SUMMARY_BY_HOST,
                values,
                one_value=True,
                return_dict=True,
            )
        return self.db.execute(
            AggregationSQLQueries.NODES_CORES_SUMMARY,
            values,
            one_value=True,
            return_dict=True,
        )

    def get_nodes_and_cores_graph(
        self,
        service_id: int,
        start_time: datetime,
        end_time: datetime,
        interval: str,
        hostname: Optional[str] = None,
    ) -> List[Dict]:

        values = {"service_id": service_id, "start_time": start_time, "end_time": end_time, "interval_gap": interval}
        hostname_condition = ""
        if hostname:
            hostname_condition = "AND profilerProcesses.hostname = %(hostname)s"
            values["hostname"] = hostname
        return self.db.execute(
            AggregationSQLQueries.NODES_CORES_SUMMARY_GRAPH.format(hostname=hostname_condition),
            values,
            one_value=False,
            return_dict=True,
            fetch_all=True,
        )

    def get_agents(self, service_id):
        values = (AGENT_RETENTION_HOURS, service_id)
        return self.db.execute(
            AggregationSQLQueries.PROFILER_AGENTS_BY_SERVICE,
            values,
            has_value=True,
            one_value=False,
            return_dict=True,
            fetch_all=True,
        )

    def get_services_with_data_indication(self):
        values = {
            "hours_interval": SERVICES_LIST_HOURS_INTERVAL
        }
        return self.db.execute(
            AggregationSQLQueries.SERVICES_SELECTION_WITH_DATA_INDICATION,
            values,
            has_value=True,
            one_value=False,
            return_dict=True,
            fetch_all=True,
        )

    def update_processes(self, processes: List[int]):
        self.db.execute(
            SQLQueries.UPDATE_PROFILER_PROCESSES_LAST_SEEN_TIME,
            [(v,) for v in processes],
            has_value=False,
            execute_values=True,
        )

    def get_filters(self, service_id: int) -> List[Dict]:
        values = {"service_id": service_id}
        return self.db.execute(
            SQLQueries.GET_FILTERS_BY_SERVICE_ID, values, one_value=False, return_dict=True, fetch_all=True
        )

    def add_filter(self, service_id: int, filter_content: str):
        values = {"service_id": service_id, "filter_content": filter_content}
        return self.db.execute(SQLQueries.INSERT_FILTER, values)

    def update_filter(self, filter_id: int, filter_content: str):
        values = {"filter_id": filter_id, "filter_content": filter_content}
        self.db.execute(SQLQueries.UPDATE_FILTER, values, has_value=False)

    def delete_filter(self, filter_id: int):
        values = {"filter_id": filter_id}
        self.db.execute(SQLQueries.DELETE_FILTER, values, has_value=False)

    def get_profiler_token(self) -> str:
        results = self.db.execute(
            SQLQueries.SELECT_PROFILER_TOKEN,
            return_dict=True,
            fetch_all=True,
        )
        if results:
            return results[0]["token"]

        token = generate_token(32)
        self.db.execute(SQLQueries.INSERT_PROFILER_TOKEN, {"token": token}, has_value=False, one_value=False)
        return token

    def get_profiler_token_id(self, token: str) -> int:
        return self.db.execute(
            SQLQueries.SELECT_PROFILER_TOKEN_ID,
            {"token": token},
            return_dict=True,
            fetch_all=True,
            one_value=True
        )

    def get_service_id_by_name(self, service_name: str) -> int:
        return self.db.execute(SQLQueries.SELECT_SERVICE_ID_BY_NAME, (service_name, ))

    def update_tokens_last_seen(self, tokens: Set[tuple[int, str, int]]):
        self.db.execute(
            SQLQueries.UPDATE_PROFILER_TOKENS_LAST_SEEN_TIME, tokens, has_value=False, execute_values=True
        )

    def get_overview_summary(self) -> Dict:
        values = {
            "retention_hours": AGENT_RETENTION_HOURS,
            "visible_hours": SERVICES_LIST_HOURS_VISIBLE_INTERVAL,
        }
        return self.db.execute(
            AggregationSQLQueries.SERVICES_NODES_CORES_SUMMARY, values, one_value=False, return_dict=True
        )

    def get_services_overview_summary(self) -> List[Dict]:
        values = {
            "retention_hours": AGENT_RETENTION_HOURS,
            "visible_hours": SERVICES_LIST_HOURS_VISIBLE_INTERVAL
        }
        return self.db.execute(
            AggregationSQLQueries.SERVICES_SUMMARY, values, one_value=False, return_dict=True, fetch_all=True
        )
