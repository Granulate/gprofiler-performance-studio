#!/usr/bin/env bash



local_branch="$(git rev-parse --abbrev-ref HEAD)"

valid_branch_regex="^(feature|bugfix|release|hotfix)\/[a-z0-9.-]+$"

message="There is something wrong with your branch name. Branch names in this project must adhere to this contract: $valid_branch_regex, for example <feature/bugfix/hotfix/release>/<ticket-description>. Your commit will be rejected. Please rename your branch, using `git branch -m <new-branch-name>`, to a valid name and try again."

if [[ ! $local_branch =~ $valid_branch_regex ]]
then
    echo "$message"
    exit 1
fi

exit 0
