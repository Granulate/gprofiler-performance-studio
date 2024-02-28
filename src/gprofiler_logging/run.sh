#!/usr/bin/env bash



set -ueo pipefail

CURRENT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
LISTEN_PORT="${UVICORN_PORT:-80}"
if [[ "${UVICORN_LIMIT_CONCURRENCY:-}" == "" ]]; then
    UVICORN_LIMIT_CONCURRENCY=$(echo "$(awk '/MemTotal/ { print $2 }' /proc/meminfo) / 1024 / 1024 * 8" | bc)
    echo UVICORN_LIMIT_CONCURRENCY not specified. Using "${UVICORN_LIMIT_CONCURRENCY}"
fi

uvicorn_cmd_line=" --host 0.0.0.0 \
               --port ${LISTEN_PORT} \
               --limit-concurrency ${UVICORN_LIMIT_CONCURRENCY} \
               --workers 1"

uvicorn app.main:app ${uvicorn_cmd_line}
