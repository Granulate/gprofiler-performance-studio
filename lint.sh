#!/usr/bin/env bash



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
