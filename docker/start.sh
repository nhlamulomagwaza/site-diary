#!/bin/sh
set -e

node /app/server.js &
nginx -g 'daemon off;'
