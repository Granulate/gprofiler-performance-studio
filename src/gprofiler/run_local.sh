#!/usr/bin/env bash




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
