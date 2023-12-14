#!/usr/bin/env bash

# INTEL CONFIDENTIAL
# Copyright (C) 2023 Intel Corporation
# This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
# This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.

# for pre-commit git hook
CURRENT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/../.."
black_extra_args=""
isort_extra_args=""
if [[ "$1" = "--ci" ]]; then
  CURRENT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
  check_arg="--check"
  isort_extra_args="--check-only"
fi

SRC_DIR= "$CURRENT_DIR/src"

isort --settings-path "$CURRENT_DIR/.isort.cfg" $isort_extra_args "$CURRENT_DIR/src"

black --line-length 120 $black_extra_args --exclude ".*venv.*" "$CURRENT_DIR/src"
flake8 --config "$CURRENT_DIR/.flake8" "$CURRENT_DIR/src"
mypy "$CURRENT_DIR" . --exclude="$CURRENT_DIR/src/flamedb/flamedb-backup"
mypy "$CURRENT_DIR/src/flamedb/flamedb-backup"
