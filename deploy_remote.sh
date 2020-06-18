#!/bin/bash

source .env

ssh -i "$TOKEN_PATH" "$SSH_URL" -t "cd $SSH_PATH ; bash -c" \
"bash -s" < ./deploy.sh
