#!/usr/bin/env bash

# nohup node index.js &
./node_modules/.bin/babel-node bin/sand >>/var/log/sandbox.log 2>&1

# /usr/sbin/nginx -c /etc/nginx.conf
