# INTEL CONFIDENTIAL
# Copyright (C) 2023 Intel Corporation
# This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
# This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.

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
