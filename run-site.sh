#!/bin/sh

./md5.sh
/busybox/httpd -f -p 8090
