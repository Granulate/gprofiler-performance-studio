# Copyright (C) 2023 Intel Corporation
# 
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
# 
#    http://www.apache.org/licenses/LICENSE-2.0
# 
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.



from textwrap import dedent


class SQLQueries:
    INSERT_SNAPSHOT = dedent(
        """
        INSERT INTO ProfilerSnapshots(service, start_time, end_time, filter_content)
        VALUES (%(service_id)s, %(start_time)s, %(end_time)s, %(filter_content)s)
        RETURNING ID;
        """
    )
    INSERT_FRAME = dedent(
        """
        INSERT INTO MinesweeperFrames(snapshot, level, start, duration)
        VALUES %s
        RETURNING ID;
        """
    )
    ADD_OR_FETCH_INSTANCE = "SELECT * FROM get_instance(%s, %s)"
    SELECT_MACHINE_TYPE = dedent(
        """
        SELECT MachineTypes.ID
        FROM MachineTypes
        WHERE MachineTypes.provider = %s AND
              MachineTypes.name = %s
        """
    ).strip()
    INSERT_MACHINE_TYPE = dedent(
        """
        INSERT INTO MachineTypes(provider, name)
        VALUES (%s, %s)
        ON CONFLICT DO NOTHING
        RETURNING ID;
        """
    ).strip()
    SELECT_MACHINE = dedent(
        """
        SELECT Machines.ID
        FROM Machines
        WHERE Machines.type = %s AND
              Machines.processors = %s AND
              Machines.memory = %s;
        """
    ).strip()
    INSERT_MACHINE = dedent(
        """
        INSERT INTO Machines(type, processors, memory)
        VALUES (%s, %s, %s)
        ON CONFLICT DO NOTHING
        RETURNING ID;
        """
    ).strip()
    SELECT_PROFILER_AGENT_VERSION = dedent(
        """
        SELECT ProfilerVersions.ID
        FROM ProfilerVersions
        WHERE ProfilerVersions.major = %s AND
              ProfilerVersions.minor = %s AND
              ProfilerVersions.patch = %s
        """
    ).strip()
    INSERT_PROFILER_AGENT_VERSION = dedent(
        """
        INSERT INTO ProfilerVersions(major, minor, patch, weight)
        VALUES (%s, %s, %s, %s)
        ON CONFLICT DO NOTHING
        RETURNING ID;
        """
    ).strip()
    SELECT_PROFILER_RUN_ENVIRONMENTS = dedent(
        """
        SELECT ProfilerRunEnvironments.ID
        FROM ProfilerRunEnvironments
        WHERE ProfilerRunEnvironments.python_version = %s AND
              ProfilerRunEnvironments.libc = %s AND
              ProfilerRunEnvironments.run_mode = %s;
        """
    ).strip()
    INSERT_PROFILER_RUN_ENVIRONMENTS = dedent(
        """
        INSERT INTO ProfilerRunEnvironments(python_version, libc, run_mode)
        VALUES (%s, %s, %s)
        ON CONFLICT DO NOTHING
        RETURNING ID;
        """
    ).strip()
    SELECT_OS = dedent(
        """
        SELECT OSes.ID
        FROM OSes
        WHERE OSes.system_name = %s AND
              OSes.name = %s AND
              OSes.release = %s;
        """
    ).strip()
    INSERT_OS = dedent(
        """
        INSERT INTO OSes(system_name, name, release)
        VALUES (%s, %s, %s)
        ON CONFLICT DO NOTHING
        RETURNING ID;
        """
    ).strip()
    SELECT_KERNEL = dedent(
        """
        SELECT Kernels.ID
        FROM Kernels
        WHERE Kernels.os = %s AND
              Kernels.release = %s AND
              Kernels.version = %s AND
              Kernels.hardware_type = %s;
        """
    ).strip()
    INSERT_KERNEL = dedent(
        """
        INSERT INTO Kernels(os, release, version, hardware_type)
        VALUES (%s, %s, %s, %s)
        ON CONFLICT DO NOTHING
        RETURNING ID;
        """
    ).strip()
    SELECT_INSTANCE_CLOUD_METADATA = dedent(
        """
        SELECT InstanceCloudMetadata.ID FROM InstanceCloudMetadata
        WHERE InstanceCloudMetadata.meta = %s AND
              InstanceCloudMetadata.hash_meta = %s;
        """
    ).strip()
    INSERT_INSTANCE_CLOUD_METADATA = dedent(
        """
        INSERT INTO InstanceCloudMetadata(meta, hash_meta)
        VALUES (%s, %s)
        ON CONFLICT DO NOTHING
        RETURNING ID;
        """
    ).strip()
    SELECT_LIBC = "SELECT Libcs.ID FROM Libcs WHERE Libcs.type = %s AND Libcs.version = %s;"
    INSERT_LIBC = dedent(
        """
        INSERT INTO Libcs(type, version)
        VALUES (%s, %s)
        ON CONFLICT DO NOTHING
        RETURNING ID;
        """
    ).strip()
    SELECT_SERVICE = "SELECT Services.ID FROM Services WHERE Services.name = %s AND Services.cluster_id IS NULL"
    SELECT_SERVICE_NAME_BY_ID = "SELECT Services.name FROM Services WHERE Services.id = %s"
    SELECT_SERVICE_SAMPLE_THRESHOLD_BY_ID = (
        "SELECT Services.profiler_sample_threshold FROM Services WHERE Services.id = %s"
    )
    ADD_OR_FETCH_SERVICE = "SELECT * FROM get_service(%s, service_env_type := %s, use_dot_logic := FALSE)"
    SELECT_DEPLOYMENT = "SELECT Services.ID FROM Services WHERE Services.cluster_id = %s AND Services.name = %s"
    ADD_OR_FETCH_DEPLOYMENT = "SELECT * FROM get_deployment(my_cluster_id:= %s, service_name:= %s, namespace:= %s)"
    ADD_OR_FETCH_INSTANCE_RUN = "SELECT * FROM get_instance_run(%s, %s, %s, %s, %s)"
    FIX_INSTANCE_RUN_MACHINE = dedent(
        """
        UPDATE InstanceRuns
        SET machine = %s, metadata = %s
        WHERE ID = %s;
        """
    ).strip()
    ADD_OR_FETCH_PROFILER_PROCESS = "SELECT * FROM get_profiler_process(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
    # TODO: remove UPDATE_PROFILER_PROCESS_LAST_SEEN_TIME when dropping support for older version <= 1.2.2

    UPDATE_PROFILER_PROCESS_LAST_SEEN_TIME = dedent(
        """
        UPDATE ProfilerProcesses
        SET last_seen = CURRENT_TIMESTAMP
        WHERE ProfilerProcesses.ID = %s;
        """
    ).strip()
    UPDATE_PROFILER_PROCESSES_LAST_SEEN_TIME = dedent(
        """
        UPDATE ProfilerProcesses
        SET last_seen = CURRENT_TIMESTAMP
        FROM (VALUES %s) AS Processes(ID)
        WHERE ProfilerProcesses.ID = Processes.ID;
        """
    ).strip()
    GET_SERVICE_ID_BY_PROCESS_ID = dedent(
        """
        SELECT ProfilerProcesses.service
        FROM ProfilerProcesses
        WHERE ProfilerProcesses.ID = %s;
        """
    ).strip()
    INSERT_FILTER = dedent(
        """
        INSERT INTO ProfilerFilters(service, filter_content)
        VALUES (%(service_id)s, %(filter_content)s)
        RETURNING ID;
    """
    )
    UPDATE_FILTER = dedent(
        """
        UPDATE ProfilerFilters
        SET filter_content = %(filter_content)s
        WHERE ProfilerFilters.ID = %(filter_id)s;
    """
    )
    DELETE_FILTER = dedent(
        """
        DELETE FROM ProfilerFilters
        WHERE ProfilerFilters.id = %(filter_id)s;
    """
    )
    GET_FILTERS_BY_SERVICE_ID = dedent(
        """
        SELECT id, filter_content FROM ProfilerFilters
        WHERE ProfilerFilters.service = %(service_id)s
    """
    )
    SELECT_PROFILER_TOKEN = dedent(
        """
        SELECT token FROM ProfilerTokens
        WHERE ProfilerTokens.disabled IS NULL
    """
    )
    SELECT_PROFILER_TOKEN_ID = dedent(
        """
        SELECT ID FROM ProfilerTokens
        WHERE ProfilerTokens.token = %(token)s AND ProfilerTokens.disabled IS NULL
    """
    )
    INSERT_PROFILER_TOKEN = dedent(
        """
        INSERT INTO ProfilerTokens(token)
        VALUES(%(token)s)
    """
    )
    SELECT_SERVICE_ID_BY_NAME = dedent(
        """
        SELECT Services.ID
        FROM Services
        WHERE Services.name = %s AND NOT Services.hidden AND Services.cluster_id IS NULL
        """
    ).strip()
    UPDATE_PROFILER_TOKENS_LAST_SEEN_TIME = dedent(
        """
        INSERT INTO TokenAssociations(token, service_name, service)
        VALUES %s
        ON CONFLICT ON CONSTRAINT "unique token_association" DO
        UPDATE SET last_seen = CURRENT_TIMESTAMP, service = EXCLUDED.service
        """
    ).strip()


class AggregationSQLQueries:
    PROFILER_AGENTS_BY_SERVICE = dedent(
        """
        WITH UniqueProfilerProcesses AS (
            SELECT FIRST(ProfilerProcesses.ID ORDER BY ProfilerProcesses.last_seen DESC) AS profiler_process_id
            FROM ProfilerProcesses
            INNER JOIN InstanceRuns ON InstanceRuns.ID = ProfilerProcesses.instance_run
            INNER JOIN Instances ON Instances.ID = InstanceRuns.instance
            INNER JOIN Services ON Services.ID = ProfilerProcesses.service
            WHERE ProfilerProcesses.last_seen > CURRENT_TIMESTAMP - %s * INTERVAL '1 hours'
            AND Services.hidden = False
            AND Services.cluster_id IS NULL
            GROUP BY Instances.ID
        ), UniqueInstances AS (
            SELECT Instances.mac, ProfilerProcesses.service AS service_id, ProfilerProcesses.hostname,
                   CONCAT(ProfilerVersions.major, '.', ProfilerVersions.minor, '.', ProfilerVersions.patch) AS version,
                   Machines.processors, ProfilerProcesses.last_seen
            FROM UniqueProfilerProcesses
            INNER JOIN ProfilerProcesses ON ProfilerProcesses.ID = UniqueProfilerProcesses.profiler_process_id
            INNER JOIN InstanceRuns ON InstanceRuns.ID = ProfilerProcesses.instance_run
            INNER JOIN Instances ON Instances.ID = InstanceRuns.instance
            INNER JOIN Machines ON Machines.ID = InstanceRuns.machine
            INNER JOIN ProfilerVersions ON ProfilerVersions.ID = ProfilerProcesses.profiler_version
        )
        SELECT UniqueInstances.mac, UniqueInstances.hostname, UniqueInstances.processors,
               UniqueInstances.version, UniqueInstances.last_seen
        FROM UniqueInstances
        WHERE UniqueInstances.service_id = %s;
        """
    ).strip()

    SERVICES_SELECTION_WITH_DATA_INDICATION = dedent(
        """
        WITH ServicesLastSeen AS (
            SELECT Services.name, MAX(ProfilerProcesses.last_seen) AS last_seen,
                Services.ts AS create_date, Services.ID as service_id
            FROM Services
            INNER JOIN ProfilerProcesses ON ProfilerProcesses.service = Services.ID
            WHERE NOT Services.hidden
            AND Services.cluster_id IS NULL
            AND ProfilerProcesses.last_seen >= CURRENT_TIMESTAMP - %(hours_interval)s * INTERVAL '1 hours'
            GROUP BY Services.ID
        ), Merged AS (
            SELECT ServicesLastSeen.name, COALESCE(MAX(ServicesLastSeen.last_seen) > CURRENT_TIMESTAMP - %(hours_interval)s * INTERVAL '1 hours', false)
                   OR ServicesLastSeen.create_date >= (NOW() - INTERVAL '1 hour') AS has_data, create_date, ServicesLastSeen.service_id
            FROM ServicesLastSeen
            GROUP BY ServicesLastSeen.name, create_date, service_id
            ORDER BY has_data DESC, name
        )
        SELECT Merged.name, Merged.has_data, Merged.create_date, Services.env_type, Merged.service_id
        FROM Merged
        INNER JOIN Services ON Services.ID = Merged.service_id
        """
    ).strip()

    PROFILER_PROCESS_TIMERANGES_BY_SERVICE = dedent(
        """
        SELECT GREATEST(ProfilerProcesses.ts, %(start_time)s) as first_seen,
               LEAST(ProfilerProcesses.last_seen, %(end_time)s) as last_seen
        FROM ProfilerProcesses
        INNER JOIN InstanceRuns ON InstanceRuns.ID = ProfilerProcesses.instance_run
        INNER JOIN Machines ON Machines.ID = InstanceRuns.machine
        WHERE ProfilerProcesses.last_seen >= %(start_time)s AND
              ProfilerProcesses.ts < %(end_time)s AND
              ProfilerProcesses.service = %(service_id)s
        """
    )

    NODES_CORES_SUMMARY = dedent(
        """
        /* Here we calculate duration period (in seconds) of ProfilerProcesses related to specific service within
           given timerange and inject it with cores count
        */
        WITH RelevantProfilerProcesses AS (
            SELECT Machines.processors AS processors,
                   EXTRACT(EPOCH FROM (LEAST(ProfilerProcesses.last_seen, %(end_time)s) - GREATEST(ProfilerProcesses.ts, %(start_time)s))) AS duration,
                   GREATEST(ProfilerProcesses.ts, %(start_time)s) as first_seen,
                   LEAST(ProfilerProcesses.last_seen, %(end_time)s) as last_seen,
                   ProfilerProcesses.service as service_id
            FROM ProfilerProcesses
            INNER JOIN InstanceRuns ON InstanceRuns.ID = ProfilerProcesses.instance_run
            INNER JOIN Machines ON Machines.ID = InstanceRuns.machine
            WHERE ProfilerProcesses.last_seen >= %(start_time)s AND
                  ProfilerProcesses.ts < %(end_time)s AND
                  ProfilerProcesses.service = %(service_id)s
        )
        /* Here we sum all durations and divide it by total timerange seconds count, to get average node count
           To get average cores count, we sum multiplies duration by cores and also divide it by total seconds
           in timerange.
        */
        SELECT
            CASE WHEN %(end_time)s = %(start_time)s
            THEN 0
            ELSE CEILING(SUM(processors * duration) / %(total_seconds)s)
            END AS avg_cores,
            CASE WHEN %(end_time)s = %(start_time)s
            THEN 0
            ELSE CEILING(SUM(duration) / %(total_seconds)s)
            END AS avg_nodes
        FROM RelevantProfilerProcesses
    """
    ).strip()

    NODES_CORES_SUMMARY_BY_HOST = dedent(
        """
        /* Here we calculate duration period (in seconds) of ProfilerProcesses related to specific service within
           given timerange and inject it with cores count
        */
        WITH RelevantProfilerProcesses AS (
            SELECT Machines.processors AS processors,
                EXTRACT(EPOCH FROM (LEAST(ProfilerProcesses.last_seen, %(end_time)s) - GREATEST(ProfilerProcesses.ts, %(start_time)s))) AS duration,
                GREATEST(ProfilerProcesses.ts, %(start_time)s) as first_seen,
                LEAST(ProfilerProcesses.last_seen, %(end_time)s) as last_seen,
                ProfilerProcesses.service as service_id
            FROM ProfilerProcesses
            INNER JOIN InstanceRuns ON InstanceRuns.ID = ProfilerProcesses.instance_run
            INNER JOIN Machines ON Machines.ID = InstanceRuns.machine
            WHERE ProfilerProcesses.last_seen >= %(start_time)s AND
                ProfilerProcesses.ts < %(end_time)s AND
                ProfilerProcesses.service = %(service_id)s AND
                ProfilerProcesses.hostname = %(hostname)s
        )
        /* Here we sum all durations and divide it by total timerange seconds count, to get average node count
           To get average cores count, we sum multiplies duration by cores and also divide it by total seconds
           in time range.
        */
        SELECT
            CASE WHEN %(end_time)s = %(start_time)s
            THEN 0
            ELSE CEILING(SUM(processors * duration) / %(total_seconds)s)
            END AS avg_cores,
            CASE WHEN %(end_time)s = %(start_time)s
            THEN 0
            ELSE CEILING(SUM(duration) / %(total_seconds)s)
            END AS avg_nodes
        FROM RelevantProfilerProcesses
    """
    ).strip()

    NODES_CORES_SUMMARY_GRAPH = dedent(
        """
         WITH IntervalQuery AS (
            SELECT time_interval
            FROM generate_series(%(start_time)s::TIMESTAMP, %(end_time)s::TIMESTAMP, %(interval_gap)s) AS time_interval
        ), TimeIntervals AS (
            SELECT time_interval AS start_time,
                   time_interval + %(interval_gap)s::INTERVAL AS end_time
            FROM IntervalQuery
        ), RelevantProfilerProcesses AS (
            SELECT TimeIntervals.start_time,
                   TimeIntervals.end_time,
                   EXTRACT(EPOCH FROM (LEAST(ProfilerProcesses.last_seen, TimeIntervals.end_time) - GREATEST(ProfilerProcesses.ts, TimeIntervals.start_time))) AS duration,
                   Machines.processors AS processors
            FROM TimeIntervals
            LEFT JOIN ProfilerProcesses ON ProfilerProcesses.last_seen >= TimeIntervals.start_time AND ProfilerProcesses.ts < TimeIntervals.end_time
            INNER JOIN InstanceRuns ON InstanceRuns.id = ProfilerProcesses.instance_run
            INNER JOIN Machines ON Machines.id = InstanceRuns.machine
            WHERE ProfilerProcesses.service = %(service_id)s
            {hostname}
    )
    /* Here we sum all durations and divide it by total timerange seconds count, to get average node count
    To get average cores count, we sum multiplies duration by cores and also divide it by total seconds
    in timerange.
    */
        SELECT   RelevantProfilerProcesses.start_time AS time,
                (SUM(duration) / EXTRACT(EPOCH FROM (RelevantProfilerProcesses.end_time - RelevantProfilerProcesses.start_time))) AS avg_nodes,
                 count(duration) AS max_nodes,
                 (SUM(processors * duration) / EXTRACT(EPOCH FROM (RelevantProfilerProcesses.end_time - RelevantProfilerProcesses.start_time))) AS avg_cores,
                 SUM(processors) AS max_cores
        FROM     RelevantProfilerProcesses
        GROUP BY RelevantProfilerProcesses.start_time, RelevantProfilerProcesses.end_time
        ORDER BY start_time
            """
    ).strip()

    GET_SNAPSHOT = dedent(
        """
        SELECT ProfilerSnapshots.start_time, ProfilerSnapshots.end_time, ProfilerSnapshots.filter_content,
        MinesweeperFrames.start, MinesweeperFrames.level, MinesweeperFrames.duration FROM ProfilerSnapshots
        INNER JOIN MinesweeperFrames ON MinesweeperFrames.snapshot = ProfilerSnapshots.id
        WHERE ProfilerSnapshots.id = %(snapshot_id)s AND NOT ProfilerSnapshots.hidden
    """
    ).strip()

    SERVICES_NODES_CORES_SUMMARY = dedent(
        """
        WITH RelevantProfilerProcesses AS (
            SELECT ProfilerProcesses.service, ProfilerProcesses.instance_run, ProfilerProcesses.last_seen, ProfilerProcesses.ts
            FROM ProfilerProcesses
            INNER JOIN Services ON Services.ID = ProfilerProcesses.service
            WHERE Services.hidden = False
                AND Services.cluster_id IS NULL
                AND ProfilerProcesses.last_seen >= CURRENT_TIMESTAMP - %(retention_hours)s * INTERVAL '1 hours'
        ), UniqueProfilerProcesses AS (
            SELECT RelevantProfilerProcesses.service,
                EXTRACT(EPOCH FROM (RelevantProfilerProcesses.last_seen - GREATEST(RelevantProfilerProcesses.ts, CURRENT_TIMESTAMP - %(retention_hours)s * INTERVAL '1 hours'))) AS duration,
                Machines.processors AS processors
            FROM RelevantProfilerProcesses
            INNER JOIN InstanceRuns ON InstanceRuns.ID = RelevantProfilerProcesses.instance_run
            INNER JOIN Machines ON Machines.ID = InstanceRuns.machine
        ), ServicesCoresNodes AS (
            SELECT
                COUNT(DISTINCT UniqueProfilerProcesses.service) AS services,
                CAST(CEILING(SUM(duration) / (EXTRACT(EPOCH FROM (%(retention_hours)s * INTERVAL '1 hours')))) AS INTEGER) AS instances,
                CAST(ROUND(SUM(duration * processors) / (EXTRACT(EPOCH FROM (%(retention_hours)s * INTERVAL '1 hours')))) AS INTEGER) AS cores
            FROM UniqueProfilerProcesses
        )
        SELECT instances, cores, services
        FROM ServicesCoresNodes;
        """
    ).strip()

    SERVICES_SUMMARY = dedent(
        """
        -- get latest services that were visible during `visible_hours`(30 days) period from hourly aggregated table
        WITH LatestServices AS (
            SELECT Services.ID AS service_id,
                MAX(ProfilerServiceHourlyUsages.start_date) + INTERVAL '1 hours' AS last_seen
            FROM Services
            INNER JOIN ProfilerServiceHourlyUsages ON ProfilerServiceHourlyUsages.service = Services.ID
            WHERE NOT Services.hidden
                AND Services.cluster_id IS NULL
                AND ProfilerServiceHourlyUsages.start_date >= CURRENT_TIMESTAMP - %(visible_hours)s * INTERVAL '1 hours'
            GROUP BY Services.ID
        -- for each service get latest active `retention_hours` (24 hours)
        ), LatestServicesAggRetentionHours AS (
            SELECT ProfilerServiceHourlyUsages.service AS service_id,
                ProfilerServiceHourlyUsages.running_hours,
                ProfilerServiceHourlyUsages.core_hours,
                ProfilerServiceHourlyUsages.lowest_agent_version,
                ProfilerServiceHourlyUsages.start_date,
                LatestServices.last_seen
            FROM LatestServices
            INNER JOIN ProfilerServiceHourlyUsages ON ProfilerServiceHourlyUsages.service = LatestServices.service_id
            WHERE ProfilerServiceHourlyUsages.start_date >= LatestServices.last_seen - %(retention_hours)s * INTERVAL '1 hours'
        -- get last aggregation table run, to know from each point to look for missing data from raw tables
        ), LastSeenAgg(last_seen) AS (
            VALUES(CAST((SELECT GREATEST(MAX(last_seen), CURRENT_TIMESTAMP - INTERVAL '3 hours') FROM latestServices) AS timestamp))
        -- get data that didn't aggregated yet
        ), LatestServicesFromProcessess AS (
            SELECT
                ProfilerProcesses.service AS service_id,
                EXTRACT(EPOCH FROM (ProfilerProcesses.last_seen - GREATEST(ProfilerProcesses.ts, LastSeenAgg.last_seen))) / 3600 AS running_hours,
                Machines.processors AS cores,
                ProfilerProcesses.profiler_version AS version_id,
                GREATEST(ProfilerProcesses.ts, LastSeenAgg.last_seen) AS start_date,
                ProfilerProcesses.last_seen
            FROM LastSeenAgg, ProfilerProcesses
            INNER JOIN Services ON Services.ID = ProfilerProcesses.service
            INNER JOIN InstanceRuns ON InstanceRuns.ID = ProfilerProcesses.instance_run
            INNER JOIN Machines ON Machines.ID = InstanceRuns.machine
            WHERE Services.cluster_id IS NULL
                AND NOT Services.hidden
                AND ProfilerProcesses.last_seen >= LastSeenAgg.last_seen
                AND ProfilerProcesses.last_seen >= CURRENT_TIMESTAMP - INTERVAL '3 hours'
                AND ProfilerProcesses.last_seen != ProfilerProcesses.ts
        ), AllServices AS (
            SELECT LatestServicesAggRetentionHours.service_id,
                LatestServicesAggRetentionHours.running_hours,
                LatestServicesAggRetentionHours.core_hours,
                LatestServicesAggRetentionHours.lowest_agent_version,
                LatestServicesAggRetentionHours.start_date,
                LatestServicesAggRetentionHours.last_seen
            FROM LatestServicesAggRetentionHours
            UNION ALL
            SELECT LatestServicesFromProcessess.service_id,
                LatestServicesFromProcessess.running_hours,
                LatestServicesFromProcessess.cores * LatestServicesFromProcessess.running_hours AS core_hours,
                LatestServicesFromProcessess.version_id AS lowest_agent_version,
                LatestServicesFromProcessess.start_date,
                LatestServicesFromProcessess.last_seen
            FROM LatestServicesFromProcessess
        )
        -- calculated nodes and cores average for last available `retention_hours` (24 hours)
        SELECT Services.name AS service_name,
            Services.ts AS create_date,
            Services.ID AS service_id,
            Services.env_type,
            CAST(CEILING(SUM(running_hours) / %(retention_hours)s) AS INTEGER) AS nodes,
            CAST(CEILING(SUM(core_hours) / %(retention_hours)s) AS INTEGER) AS cores,
            MAX(AllServices.last_seen) AS last_updated,
            FIRST(CONCAT(ProfilerVersions.major, '.', ProfilerVersions.minor, '.', ProfilerVersions.patch) ORDER BY ProfilerVersions.weight) AS agent_version_lowest
        FROM AllServices
        INNER JOIN Services ON Services.ID = AllServices.service_id
        INNER JOIN ProfilerVersions ON ProfilerVersions.ID = AllServices.lowest_agent_version
        GROUP BY Services.ID
        """
    ).strip()
