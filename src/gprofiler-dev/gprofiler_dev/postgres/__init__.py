# INTEL CONFIDENTIAL
# Copyright (C) 2023 Intel Corporation
# This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
# This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.

import threading
from typing import Optional

from gprofiler_dev import config
from gprofiler_dev.postgres.postgresdb import PostgresDB

_DB_INSTANCE: Optional[PostgresDB] = None
THREAD_LOCAL = threading.local()
_DB_LOCK = threading.RLock()


def get_postgres_db() -> PostgresDB:
    if config.POSTGRES_CONN_PER_THREAD:
        if getattr(THREAD_LOCAL, "postgres_conn", None) is None:
            THREAD_LOCAL.postgres_conn = PostgresDB()
        return THREAD_LOCAL.postgres_conn

    global _DB_INSTANCE

    if _DB_INSTANCE is None:
        with _DB_LOCK:
            if _DB_INSTANCE is None:
                _DB_INSTANCE = PostgresDB()

    return _DB_INSTANCE


class ParameterIsMissing(Exception):
    pass
