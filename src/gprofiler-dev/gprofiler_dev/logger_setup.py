

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
