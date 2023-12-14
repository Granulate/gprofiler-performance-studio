#!/bin/bash

# INTEL CONFIDENTIAL
# Copyright (C) 2023 Intel Corporation
# This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
# This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.

if [ "$GIT_SSH_KEY_FOR_GRANULATE_PRIVATE_REPOS" != "" ]; then
  echo "Detected SSH key for git. Adding SSH config" >&1
  echo "" >&1

  # Ensure we have the ssh folder
  if [ ! -d ~/.ssh ]; then
    mkdir -p ~/.ssh
    chmod 700 ~/.ssh
  fi

  # Load the private key into a file.
  echo $GIT_SSH_KEY_FOR_GRANULATE_PRIVATE_REPOS | base64 --decode > ~/.ssh/deploy_key

  # Change the permissions on the file to
  # be read-write for this user.
  chmod 600 ~/.ssh/deploy_key

  # Setup the ssh config file.
  # Switch out the hostname for different hosts.
  echo -e "Host github.com\n"\
          " IdentityFile ~/.ssh/deploy_key\n"\
          " IdentitiesOnly yes\n"\
          " UserKnownHostsFile=/dev/null\n"\
          " StrictHostKeyChecking no"\
          > ~/.ssh/config
else
  echo "Did not detect key"
fi
