#!/bin/sh

for i in bth.js bth.css
do
  MD5=$(md5sum $i | cut -b-16)
  EXT=${i##*.}
  N=${i%%.$EXT}
  rm -v $N-*.$EXT
  NN="${N}-${MD5}.$EXT"
  cp $i $NN
  sed -i "s|\"$N[^\.]*\.$EXT|\"$NN|" index.html
done
