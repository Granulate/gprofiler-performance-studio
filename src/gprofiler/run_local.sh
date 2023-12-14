#!/usr/bin/env bash

# INTEL CONFIDENTIAL
# Copyright (C) 2023 Intel Corporation
# This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
# This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.


CURRENT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

function clean_up {
    kill "${BACK_PID}"
    kill "${FRONT_PID}"
    exit
}
trap clean_up SIGHUP SIGINT SIGTERM

cd "${CURRENT_DIR}"
echo "Installing gprofiler python packages"
pip install -e ../gprofiler-dev
pip install -r ./requirements.txt
pip install -r ../../dev-requirements.txt
uvicorn backend.main:app --host localhost --reload --port 5000 & BACK_PID=$!

cd "${CURRENT_DIR}/frontend"
yarn install
yarn start & FRONT_PID=$!

wait ${BACK_PID} ${FRONT_PID}
