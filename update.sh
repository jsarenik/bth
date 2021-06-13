#!/bin/sh
./md5.sh
rsync -av . ~/src/jekyll/static/bth/
