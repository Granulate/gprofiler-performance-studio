

from pathlib import Path

from pydantic import BaseSettings


class Config(BaseSettings):
    log_file_path: Path
    app_log_file_path: Path
    env: str
    app_log_level: str = "DEBUG"
