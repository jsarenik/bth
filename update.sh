#!/bin/sh
./md5.sh
rsync -av --exclude=.git* . ~/src/jekyll/static/bth/
