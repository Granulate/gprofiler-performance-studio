

import time
from contextlib import contextmanager
from logging import getLogger
from threading import RLock
from typing import Union

import psycopg2
import psycopg2.extras
import psycopg2.pool
from gprofiler_dev import config

SQL_FROM_CLAUSE = " FROM "


class DBConflict(Exception):
    def __init__(self, table, key, value, cmp_value):
        super(DBConflict, self).__init__(f"DB conflict in {table} for {key}: {value} | in db: {cmp_value}")
        self.table = table
        self.key = key
        self.value = value
        self.cmp_value = cmp_value


class PostgresDB:
    def __init__(self):
        self.logger = getLogger(__name__)
        self._thread_unsafe_conn = None
        self._conn_lock = RLock()
        self._reconnect()

    def _reconnect(self):
        conn = psycopg2.connect(
            dbname=config.PG_DB_NAME,
            user=config.PG_USER,
            host=config.PG_HOST,
            port=config.PG_PORT,
            password=config.PG_PASSWORD,
            connect_timeout=config.PG_CONNECT_TIMEOUT,
        )
        self._thread_unsafe_conn = conn

    @contextmanager
    def get_locked_conn(self):
        with self._conn_lock:
            yield self._thread_unsafe_conn

    @staticmethod
    def _execute(
        cursor,
        sql_query: str,
        args: Union[tuple, dict, list] = None,
        has_value=True,
        execute_values: bool = False,
        fetch_all: bool = False,
    ):
        if execute_values:
            psycopg2.extras.execute_values(cursor, sql_query, args)
        else:
            cursor.execute(sql_query, args)
        if not has_value:
            return (None,)
        if fetch_all:
            return cursor.fetchall()
        return cursor.fetchone()

    def execute(
        self,
        sql_query: str,
        args: Union[tuple, dict, list] = None,
        has_value=True,
        one_value=True,
        execute_values: bool = False,
        return_dict: bool = False,
        fetch_all: bool = False,
    ):
        max_retires = 3
        with self._conn_lock:
            for i in range(max_retires):
                try:
                    with self.get_locked_conn() as current_conn:
                        with current_conn.cursor(
                            cursor_factory=psycopg2.extras.RealDictCursor if return_dict else None
                        ) as cursor:
                            try:
                                out = self._execute(
                                    cursor,
                                    sql_query,
                                    args,
                                    has_value,
                                    execute_values=execute_values,
                                    fetch_all=fetch_all,
                                )
                                current_conn.commit()
                                if one_value and not return_dict and not fetch_all:
                                    return out[0] if out else None
                                if fetch_all and return_dict:
                                    return [dict(d) for d in out]
                                return dict(out) if return_dict and out is not None else out
                            except Exception:
                                try:
                                    current_conn.rollback()
                                except Exception:
                                    pass
                                raise
                except (psycopg2.OperationalError, psycopg2.InterfaceError):
                    if i < max_retires - 1:
                        time.sleep(1)
                        try:
                            self.logger.error(f"Trying to reconnect #{i}")
                            self._reconnect()
                        except Exception:
                            self.logger.exception(f"Failed trying to reconnect #{i}")
                        continue
                    raise

    def add_or_fetch(self, select: str, key: tuple, insert: str, value: tuple = None, check_conflict=True):
        """Using the select query, finds the ID of the key. If not found, uses insert query to insert value.
        Both select and insert sql queries should return ID as the first return value.
        If value is not None, will default to using key - and returned-value from select should include all
        compared columns to passed value argument (+same order), except unique constraint fields
        (and also non-unique values).
        """
        assert SQL_FROM_CLAUSE in select.replace("\n", " ")
        if value is None:
            value = key
        else:
            assert key == value[: len(key)]

        out = self.execute(select, key, one_value=False)
        if out is not None:
            if check_conflict and key != value and out[1:] != value[len(key) :][: len(out[1:])]:
                select = select.replace("\n", " ")
                table = select[select.index(SQL_FROM_CLAUSE) + len(SQL_FROM_CLAUSE) :].split(" ", 1)[0]
                raise DBConflict(table, key, value, out)
            return out[0]
        out = self.execute(insert, value)
        if out is None:
            # on conflict (when another thread inserted the same value before this one) - query existing value
            out = self.execute(select, key)
        return out
