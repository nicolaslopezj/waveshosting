#!/bin/bash

cp -pR $APP_DIR $BUILD_DIR/build
rm -rf $BUILD_DIR/build/tmp $BUILD_DIR/build/log/* $BUILD_DIR/build/.git
