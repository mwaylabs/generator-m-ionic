#!/bin/sh
# fail on first failed command
set -e

# install dependencies
echo -e '\n################   INSTALL DEPENDENCIES   ################\n'
echo -e 'install globally required packages'
npm i -g bower gulp
echo -e 'installing bower packages'
bower install
echo -e 'installing npm packages'
npm install


# configure project
echo -e '\n################    CONFIGURE PROJECT   ##################\n'
# retrieve version from config.xml
VERSION="$(gulp config --silent --getWidgetAttr=version)"
# append the build number and save in config.xml
gulp config --setWidgetAttr="version=${VERSION}"
# set the android-versionCode
gulp config --setWidgetAttr="android-versionCode=${BUILD_NUMBER}"
gulp config --setWidgetAttr="android-versionName=${VERSION}.${BUILD_NUMBER}"
gulp config --setWidgetAttr="ios-CFBundleVersion=${VERSION}.${BUILD_NUMBER}"

# gulp build
echo -e '\n##################     GULP BUILD     ###################\n'
# run gulp build explicitly to make it more obvious what's happening
# build: inject version and build number into app
# build: with dev environment and minify
gulp build --buildVars="version:${VERSION},build:${BUILD_NUMBER}" --env=dev --minify
