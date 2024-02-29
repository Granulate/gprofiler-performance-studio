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

import logging
import signal

from app import config, get_logs_handler, routers
from fastapi import FastAPI
from gprofiler_dev.logger_setup import setup_logger

setup_logger(config.app_log_file_path, config.app_log_level)

app = FastAPI()

logger = logging.getLogger(__name__)


@app.on_event("startup")
async def startup_event():
    logs_handler = get_logs_handler()
    signal.signal(signal.SIGHUP, logs_handler.handle_post_rotate)
    config.log_file_path.parent.mkdir(exist_ok=True, parents=True)


app.include_router(routers.router, prefix="/api/v1")
