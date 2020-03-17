#!/bin/bash
git pull
yarn
cd client && yarn && yarn build:prod && cd ..
pm2 reload ecosystem.config.js --env production
#EOF