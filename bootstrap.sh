#!/usr/bin/env bash

nohup node index.js &

/usr/sbin/nginx -c /etc/nginx.conf
