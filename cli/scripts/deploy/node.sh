#!/bin/bash

set -e
mkdir $BUILD_DIR/build
rsync -r --exclude 'node_modules' $APP_DIR/* $BUILD_DIR/build
