#!/usr/bin/env bash
set -m

yarn update-block

# Wait a little bit to be sure the node is started
sleep 2

# start node
yarn run-node

fg %1

# This captures the terminate signal ( Ctrl ^ C )
# and terminates any process started from this shell
trap "exit" INT TERM ERR
trap "jobs -p | xargs -r kill" EXIT
