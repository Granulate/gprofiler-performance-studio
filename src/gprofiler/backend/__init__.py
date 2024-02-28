

from backend import config
from gprofiler_dev.logger_setup import setup_logger

setup_logger(config.APP_LOG_FILE_PATH, config.APP_LOG_LEVEL)
