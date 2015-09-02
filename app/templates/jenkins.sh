#!/bin/bash

# clone repository
git clone https://github.com/mwaylabs/generator-m-demo

# change into directory
cd generator-m-demo

# install dependencies
npm install
bower install

# TODO: set BUILD variable
BUILD=BUILD

# CONFIGURATION
# retrieve version from config.xml
VERSION="$(gulp config --silent --getWidgetAttr=version)"
# append the build number and save in config.xml
gulp config --setWidgetAttr="version=${VERSION}.${BUILD}"
# set the android-versionCode
gulp config --setWidgetAttr="android-versionCode=${BUILD}"

# BUILDING example
# gulp build: run separately to make it more obvious what's happening
# build: inject version and build number into app
# build:  with dev environment und resources set1
# build: minify
gulp build --buildVars="version:${VERSION},build:${BUILD}" --env=dev --res=set1 --minify
# cordova build
gulp --cordova 'build ios'

