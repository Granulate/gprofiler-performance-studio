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
