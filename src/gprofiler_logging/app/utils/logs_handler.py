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



import asyncio
from logging import getLogger
from typing import Dict, List, Optional

import aiofiles
import orjson
from aiofiles.threadpool.text import AsyncTextIOWrapper
from app.config import Config

logger = getLogger(__name__)


class LogsHandler:
    def __init__(self, config):
        self.reopen_file: bool = True
        self.log_file_handler: Optional[AsyncTextIOWrapper] = None
        self.event_loop = asyncio.get_running_loop()
        self.lock = asyncio.Lock()
        self.config: Config = config

    def handle_post_rotate(self, signum, frame):
        logger.info(f"post_rotate signal caught! {signum}, frame: {frame}")
        self.reopen_file = True

    async def write_log(self, logs: List[Dict], metadata: Dict):
        async with self.lock:
            if self.reopen_file:
                if self.log_file_handler is not None:
                    self.log_file_handler.close()
                self.log_file_handler = await aiofiles.open(self.config.log_file_path, "a")
                self.reopen_file = False
        logs_lines = []
        for log in logs:
            log["timestamp_agent"] = log.pop("timestamp")
            logs_lines.append(f"{orjson.dumps(dict(log, **metadata)).decode()}\n")
        log_lines_len = len(logs_lines)
        logger.debug(f"finished to build {log_lines_len} lines of log, metadata {metadata}")
        if self.log_file_handler:
            await self.log_file_handler.writelines(logs_lines)
