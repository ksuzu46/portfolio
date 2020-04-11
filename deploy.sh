#!/bin/bash
## A set of commands for deployment
git pull --rebase
yarn
cd client && yarn && yarn build:prod && cd ..
pm2 reload ecosystem.config.js
#EOF
