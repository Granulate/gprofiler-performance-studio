#!/usr/bin/env bash

# INTEL CONFIDENTIAL
# Copyright (C) 2023 Intel Corporation
# This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
# This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.

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
