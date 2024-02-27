#!/bin/bash

export GIT_REPO="$GET_REPO"

git clone "$GET_REPO" /home/app/source-code

exec yes | npx ts-node main.ts