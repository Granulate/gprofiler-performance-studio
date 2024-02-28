

import logging
import re
from typing import Optional, Tuple

from cachetools import TTLCache, cached
from gprofiler_dev.postgres.db_manager import DBManager


@cached(cache=TTLCache(maxsize=10000, ttl=60 * 60 * 24))
def get_service_by_api_key(api_key: str, service_name: str) -> Tuple[Optional[str], Optional[int]]:
    try:
        db_manager = DBManager()
        token_id = db_manager.get_profiler_token_id(token=api_key)

        if not token_id:
            return None, None

        return valid_service_name(service_name), token_id

    except Exception as e:
        logging.exception(f"Unexpected exception during token parse: {e}")
        return None, None


def valid_service_name(service_name: str) -> str:
    _filename_ascii_strip_re = re.compile(r"[^A-Za-z0-9_.-]")
    new_service_name_name = _filename_ascii_strip_re.sub("", service_name)
    return new_service_name_name.lstrip("_")
