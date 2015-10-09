#!/bin/sh
cd /home/nginx/node/trend/
/home/libs/nvm/v0.10.36/bin/node ./batch/getTrendsExe.js > /dev/null 2>&1

exit 0;
