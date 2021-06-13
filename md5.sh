#!/bin/sh

for i in index.js
do
  MD5=$(md5sum $i | cut -b-16)
  EXT=${i##*.}
  N=${i%%.$EXT}
  rm -v $N-*
  NN="${N}-${MD5}.$EXT"
  cp $i $NN
  sed -i "s|$N[^\"]\+|$NN|" index.html
done
