#!/bin/bash

# VARS
REPOSITORY_NAME='generator-m-ionic-demo'
REPOSITORY_BASE='https://github.com/mwaylabs/'
# TODO: set your BUILD variable according to you CI spec
BUILD=BUILD_NUMBER

echo -e '\n##################       CLONING       ##################\n'
git clone ${REPOSITORY_BASE}${REPOSITORY_URL}
cd ${REPOSITORY_NAME}

# install dependencies
echo -e '\n################   INSTALL DEPENDENCIES   ################\n'
echo -e 'install globally required packages'
npm i -g bower gulp
echo -e 'installing npm packages'
npm prune
npm install
echo -e 'installing bower packages'
bower prune
bower install

# configure project
echo -e '\n################    CONFIGURE PROJECT   ##################\n'
# retrieve version from config.xml
VERSION="$(gulp config --silent --getWidgetAttr=version)"
# append the build number and save in config.xml
gulp config --setWidgetAttr="version=${VERSION}"
# set the android-versionCode
gulp config --setWidgetAttr="android-versionCode=${BUILD}"
gulp config --setWidgetAttr="android-versionName=${VERSION}.${BUILD}"
gulp config --setWidgetAttr="ios-CFBundleVersion=${VERSION}.${BUILD}"

# gulp build
echo -e '\n##################     GULP BUILD     ###################\n'
# run gulp build explicitly to make it more obvious what's happening
# build: inject version and build number into app
# build: with dev environment and minify
gulp build --buildVars="version:${VERSION},build:${BUILD}" --env=prod --minify

#building ios
echo -e '\n##################     BUILDING IOS    ###################\n'
# --no-build here so we can use the gulp build we just performed
# provide resources set1
gulp --cordova 'prepare ios' --no-build --res=set1

echo -e '\n##################   BUILDING ANDROID   #################\n'
# --no-build here so we can use the gulp build we just performed
# provide different resources set
gulp --cordova 'build android --release' --no-build --res=set2

echo -e '\n#################         DONE         #################\n'
