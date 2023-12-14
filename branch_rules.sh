#!/usr/bin/env bash

# INTEL CONFIDENTIAL
# Copyright (C) 2023 Intel Corporation
# This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
# This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.

local_branch="$(git rev-parse --abbrev-ref HEAD)"

valid_branch_regex="^(feature|bugfix|release|hotfix)\/[a-z0-9.-]+$"

message="There is something wrong with your branch name. Branch names in this project must adhere to this contract: $valid_branch_regex, for example <feature/bugfix/hotfix/release>/<ticket-description>. Your commit will be rejected. Please rename your branch, using `git branch -m <new-branch-name>`, to a valid name and try again."

if [[ ! $local_branch =~ $valid_branch_regex ]]
then
    echo "$message"
    exit 1
fi

exit 0
