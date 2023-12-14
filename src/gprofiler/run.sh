#!/usr/bin/env bash

# INTEL CONFIDENTIAL
# Copyright (C) 2023 Intel Corporation
# This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
# This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.

set -ueo pipefail

CURRENT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
LISTEN_PORT="${NGINX_PORT:-80}"

if [[ "${GUNICORN_PROCESS_COUNT:-}" == "" ]]; then
    GUNICORN_PROCESS_COUNT=$(nproc)
    echo GUNICORN_PROCESS_COUNT not specified. Using "${GUNICORN_PROCESS_COUNT}"
fi
if [[ "${GUNICORN_DD_STATSD_HOST:-}" == "" ]]; then
   GUNICORN_DD_STATSD_HOST="localhost:8125"
   echo GUNICORN_DD_STATSD_HOST not specified. Using "${GUNICORN_DD_STATSD_HOST}"
fi
if [[ "${GUNICORN_MAX_REQUESTS:-}" == "" ]]; then
   GUNICORN_MAX_REQUESTS=10000
   echo GUNICORN_MAX_REQUESTS not specified. Using "${GUNICORN_MAX_REQUESTS}"
fi
if [[ "${GUNICORN_LOG_LEVEL:-}" == "" ]]; then
    GUNICORN_LOG_LEVEL="warning"
   echo GUNICORN_LOG_LEVEL not specified. Using "${GUNICORN_LOG_LEVEL}"
fi
gunicorn_pid_file=/var/run/gunicorn.pid

gunicorn_cmd_line=" --workers=${GUNICORN_PROCESS_COUNT} \
               --bind=unix:/tmp/mysite.sock \
               --worker-class=uvicorn.workers.UvicornWorker \
               --statsd-host=${GUNICORN_DD_STATSD_HOST} \
               --name=gprofiler_gunicorn \
               --max-requests=${GUNICORN_MAX_REQUESTS} \
               --max-requests-jitter=1000 \
               --timeout=300 \
               --preload \
               --log-level=${GUNICORN_LOG_LEVEL} \
               --pid=${gunicorn_pid_file}"

function clean_up {
    kill "${GUNICORN_PID}"
    kill "${NGINX_PID}"
    exit
}
trap clean_up SIGHUP SIGINT SIGTERM
rm -f ${gunicorn_pid_file}

cd ${CURRENT_DIR} && gunicorn backend.main:app ${gunicorn_cmd_line} &
GUNICORN_PID=$!

sed -i -E "s/listen [0-9]+/listen ${LISTEN_PORT}/" /etc/nginx/nginx.conf
nginx -g "daemon off;" &
NGINX_PID=$!

wait ${GUNICORN_PID} ${NGINX_PID}
