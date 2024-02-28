

import functools

from app.config import Config
from app.utils.logs_handler import LogsHandler

config = Config()


@functools.lru_cache(maxsize=1)
def get_logs_handler() -> LogsHandler:
    return LogsHandler(config)
