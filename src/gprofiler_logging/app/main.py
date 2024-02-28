

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
