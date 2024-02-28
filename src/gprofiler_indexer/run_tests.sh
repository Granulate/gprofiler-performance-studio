#!/usr/bin/env bash



RED='\033[0;31m'
NC='\033[0m'
GREEN='\033[0;32m'

run_command() {
  $@
  if [ $? -eq 0 ]
  then
    echo -e ${GREEN}[SUCCESS]${NC} $@
  else
    echo -e ${RED}[FAILED]${NC} $@
    exit 1
  fi
}

run_command go test -v *.go
