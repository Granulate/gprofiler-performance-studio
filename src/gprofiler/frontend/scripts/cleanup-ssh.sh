#!/bin/bash

# INTEL CONFIDENTIAL
# Copyright (C) 2023 Intel Corporation
# This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
# This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.

if [ "$GIT_SSH_KEY_FOR_GRANULATE_PRIVATE_REPOS" != "" ]; then
  echo "Cleaning up SSH config" >&1
  echo "" >&1

  # Now that npm has finished running,
  # we shouldn't need the ssh key/config anymore.
  # Remove the files that we created.
  rm -f ~/.ssh/config
  rm -f ~/.ssh/deploy_key

  # Clear that sensitive key data from the environment
  export GIT_SSH_KEY_FOR_GRANULATE_PRIVATE_REPOS=0
fi
