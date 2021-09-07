#!/bin/bash

set -e

npm run build
cd $BUILD_DIR
git clone https://github.com/waveshosting/static-server build
cd build
rm -rf .git
mv $APP_DIR/build/ $BUILD_DIR/build/build/
