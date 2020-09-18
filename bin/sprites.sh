#/bin/sh

cd $(dirname "${BASH_SOURCE}")/..

dir="assets/sprites"

for source in `ls -l $dir | grep ^d | awk '{print $9}' `; do
  echo $source
  npx svgstore -o $dir/$source.svg $dir/$source/*.svg --inline
  sed -i 's/<svg>/<svg xmlns=\"http:\/\/www.w3.org\/2000\/svg\" xmlns:xlink=\"http:\/\/www.w3.org\/1999\/xlink\" style=\"isolation:isolate\">/g' $dir/$source.svg
  sed -i 's/ fill="rgb(0,0,0)"//g' $dir/$source.svg
done
