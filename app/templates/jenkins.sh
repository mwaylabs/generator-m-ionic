#!/bin/bash

# VARS
REPOSITORY_NAME='generator-m-demo'
REPOSITORY_BASE='https://github.com/mwaylabs/'
# TODO: set BUILD variable
BUILD=0

echo -e '\n#######################       CLONING       #######################\n'
git clone ${REPOSITORY_BASE}${REPOSITORY_NAME}
cd ${REPOSITORY_NAME}

# install dependencies
echo -e '\n####################### INSTALL DEPENDENCIES #######################\n'
echo -e 'installing npm packages'
npm prune
npm install
echo -e 'installing bower packages'
bower prune
bower install

echo -e '\n#######################    CONFIGURATION     #######################\n'
# retrieve version from config.xml
VERSION="$(gulp config --silent --getWidgetAttr=version)"
# append the build number and save in config.xml
gulp config --setWidgetAttr="version=${VERSION}"
# set the android-versionCode
gulp config --setWidgetAttr="android-versionCode=${BUILD}"
gulp config --setWidgetAttr="android-versionName=${VERSION}.${BUILD}"
gulp config --silent --setWidgetAttr="ios-CFBundleVersion=${VERSION}.${BUILD}"

echo -e '\n#######################      GULP BUILD      #######################\n'
# run gulp build explicitly to make it more obvious what's happening
# build: inject version and build number into app
# build: with dev environment and resources set1
# build: minify
gulp build --buildVars="version:${VERSION},build:${BUILD}" --env=dev --res=set1 --minify

echo -e '\n#######################     BUILDING IOS     #######################\n'
# --no-build here so we can use the one we just built
gulp --cordova 'prepare ios' --no-build

echo -e '\n########################   BUILDING ANDROID   #######################\n'
# --no-build here so we can use the one we just built
gulp --cordova 'build android --release' --no-build

echo -e '\n#######################         DONE         #######################\n'
