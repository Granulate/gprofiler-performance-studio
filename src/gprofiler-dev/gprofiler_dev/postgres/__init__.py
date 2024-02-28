

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
