#
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
#

from __future__ import annotations

import queue
import threading
import time
from functools import lru_cache
from logging import getLogger
from typing import TYPE_CHECKING, Tuple

if TYPE_CHECKING:
    from gprofiler_dev.postgres.db_manager import DBManager

PROCESSES_UPDATER_INTERVAL_SEC = 30
TOKENS_UPDATER_INTERVAL_SEC = 300

logger = getLogger(__name__)


class GprofilerMetadataUtils:
    def __init__(self, db: DBManager):
        self.db = db
        self.processes_queue: queue.Queue[int] = queue.Queue()
        self.update_processes_thread = threading.Thread(
            target=self._processes_updater, args=(PROCESSES_UPDATER_INTERVAL_SEC,), daemon=True
        )
        self.update_processes_thread.start()

    def _processes_updater(self, interval: int):
        while True:
            start = time.time()
            processes = set()
            while True:
                try:
                    val = self.processes_queue.get(timeout=1)
                    processes.add(val)
                except queue.Empty:
                    pass
                if time.time() - start > interval:
                    break
            if processes:
                self.db.update_processes(list(processes))


class GprofilerUtils:
    def __init__(self, db: DBManager):

        self.db = db

        self.tokens_queue: queue.Queue[Tuple[int, str, int]] = queue.Queue()
        self.update_tokens_thread = threading.Thread(
            target=self._token_updater, args=(TOKENS_UPDATER_INTERVAL_SEC,), daemon=True
        )
        self.update_tokens_thread.start()

    def _token_updater(self, interval: int):
        while True:
            start = time.time()
            tokens = set()
            while True:
                try:
                    val = self.tokens_queue.get(timeout=1)
                    tokens.add(val)
                except queue.Empty:
                    pass
                if time.time() - start > interval:
                    break
            if tokens:
                self.db.update_tokens_last_seen(tokens)


@lru_cache(maxsize=1)
def get_gprofiler_metadata_utils(db):
    return GprofilerMetadataUtils(db)


@lru_cache(maxsize=1)
def get_gprofiler_utils(db):
    return GprofilerUtils(db)
