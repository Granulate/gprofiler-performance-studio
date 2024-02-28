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

# for pre-commit git hook
CURRENT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/../.."
black_extra_args=""
isort_extra_args=""
if [[ "$1" = "--ci" ]]; then
  CURRENT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
  check_arg="--check"
  isort_extra_args="--check-only"
fi

SRC_DIR="$CURRENT_DIR/src"

isort --settings-path "$CURRENT_DIR/.isort.cfg" $isort_extra_args "$CURRENT_DIR/src"

black --line-length 120 $black_extra_args --exclude ".*venv.*" "$CURRENT_DIR/src"
flake8 --config "$CURRENT_DIR/.flake8" "$CURRENT_DIR/src"
mypy "$CURRENT_DIR" --exclude ".*venv.*"
