# INTEL CONFIDENTIAL
# Copyright (C) 2023 Intel Corporation
# This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
# This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.

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
