#!/usr/bin/env bash

#
# Copyright (C) 2023 Intel Corporation
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

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
