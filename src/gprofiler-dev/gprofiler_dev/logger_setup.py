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

import logging.config
import logging.handlers
import os
import platform
import sys
from pathlib import Path

from pythonjsonlogger import jsonlogger


class HostnameFilter(logging.Filter):
    hostname = os.getenv("HOSTNAME", platform.node())

    def filter(self, record):
        record.hostname = HostnameFilter.hostname
        return True


def setup_logger(log_file_path, log_level, max_bytes=1024 * 1024 * 10, backup_count=3):
    Path(log_file_path).parent.mkdir(exist_ok=True, parents=True)

    logger = logging.getLogger("root")

    log_format = "[%(asctime)s] %(levelname)s: %(name)s: %(message)s: %(hostname)s"

    console_handler = logging.StreamHandler(stream=sys.stdout)
    console_handler.addFilter(HostnameFilter())
    console_handler.setFormatter(logging.Formatter(log_format))

    file_handler = logging.handlers.RotatingFileHandler(log_file_path, maxBytes=max_bytes, backupCount=backup_count)
    file_handler.addFilter(HostnameFilter())
    file_handler.setFormatter(jsonlogger.JsonFormatter(log_format))

    logger.addHandler(file_handler)
    logger.addHandler(console_handler)

    logger.setLevel(log_level)
