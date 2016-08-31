# Continuous Integration - Putting it all together

> In other guides you may have learned about [environments](./environments.md), [build vars](./build_vars.md), [`gulp config`](./programmatically_change_configxml.md) and other features to change the configuration and behavior of your app via the command line. This guides shows you how to combine all those features and build your app from the command line. This enables you for instance to to understand how your app is built in our [Greenhouse & Relution Guide](./greenhouse.md).


Find the full example of how you can put all of this to use in a **Continuous Integration** environment in the [`jenkins.sh`](https://github.com/mwaylabs/generator-m-ionic/blob/master/generators/app/templates/jenkins.sh) shell script of your project. We'll go through each part step by step.

## Setup and cloning your project
```sh
#!/bin/bash

# VARS
REPOSITORY_NAME='generator-m-ionic-demo'
REPOSITORY_BASE='https://github.com/mwaylabs/'
# TODO: set your BUILD variable according to your CI's spec
# in Jenkins the build number is accessed via BUILD_NUMBER
BUILD=BUILD_NUMBER

echo -e '\n##################       CLONING       ##################\n'
git clone ${REPOSITORY_BASE}${REPOSITORY_NAME}
cd ${REPOSITORY_NAME}
```
At first the script set the name and base URL for the repository, so we can clone the repo and change into it's directory. Additionally the build number is obtained and saved into the `BUILD` variable.

## Installing dependencies
```sh
# install dependencies
echo -e '\n################   INSTALL DEPENDENCIES   ################\n'
echo -e 'install globally required packages'
npm i -g bower gulp
echo -e 'installing npm packages'
npm install
echo -e 'installing bower packages'
bower install
```
This part first installs the globally required packages `bower` and `gulp`. Depending on your CI's configuration you only have to do this once. Then all node and bower packages get installed for your Generator-M-Ionic project.

## config.xml configuration
```sh
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
```
At [M-Way](https://github.com/mwaylabs/) we like to maintain the version of our apps in just one place. For us, this is the project's `config.xml`. Thus, when the app is built we read the value from the `config.xml` using the [`gulp config`](./programmatically_change_configxml.md) command and assign it to the `VERSION` variable. This variable is combined with the build number in `BUILD` and written to the `config.xml` so the app's version and build number get shown in the [Android Play Store](https://play.google.com/store), [Apple's App Store](https://en.wikipedia.org/wiki/App_Store_(iOS) and [Relution](https://www.relution.io/) or own Platform. This is done with the above commands.

Assume the `config.xml` looks somewhat like this and this is our `25`th build:
```xml
<widget version="1.0.1"
  id="com.new.bundle"
  ...>
```
Running the above commands then produces the following `config.xml`:
```xml
<widget version="1.0.1.25"
   id="com.new.bundle"
   android-versionCode="25"
   android-versionName="1.0.1.25"
   ios-CFBundleVersion="1.0.1.25">
```
Now the versions are properly set including the build number and our app is ready to be built.

## gulp build
```sh
# gulp build
echo -e '\n##################     GULP BUILD     ###################\n'
# run gulp build explicitly to make it more obvious what's happening
# build: inject version and build number into app
# build: with dev environment and minify
gulp build --buildVars="version:${VERSION},build:${BUILD}" --env=prod --minify
```
The additional benefit of extracting the version is that it's now possible to inject the `VERSION` and `BUILD` variable using [build vars](./build_vars.md) into our Angular constant, thus eliminating the need for a [Cordova plugin](https://github.com/whiteoctober/cordova-plugin-app-version) to read those values. The above `gulp build` command builds the web app part of our app into the `www/` folder of our project, injects the build vars, includes our prod [environment](./environments.md) and minifies the whole build.

Given the above commands the `config-const.js` looks like this (before minification of course):
```js
'use strict';
angular.module('main')
.constant('Config', {

  // gulp environment: injects environment vars
  ENV: {
    /*inject-env*/
    'SERVER_URL': 'https://PRODSERVER/api',
    'SOME_OTHER_URL': '/proxy'
    /*endinject*/
  },

  // gulp build-vars: injects build vars
  BUILD: {
    /*inject-build*/
    'version': '1.0.1',
    'build': '25'
    /*endinject*/
  }

});
```

## Cordova build
```sh
#building ios
echo -e '\n##################     BUILDING IOS    ###################\n'
# --no-build here so we can use the gulp build we just performed
# provide resources set1
gulp --cordova 'prepare ios' --no-build --res=set1

echo -e '\n##################   BUILDING ANDROID   #################\n'
# --no-build here so we can use the gulp build we just performed
# provide different resources set
gulp --cordova 'build android --release' --no-build --res=set2
```
Last but not least the script builds the Cordova part of our app around our web app we just built using `gulp build`. Do not omit the `--no-build` flag here, because otherwise this will perform another `gulp build` implicitly without the build vars and minification. And that's not what we want at this point. The `--res` flag supplies the desired [App Icon and splash screen](./icons_splash_screens.md) assets.

Note: for iOS it is usually necessary to perform the build using Xcode to take care of code signing. Luckily Jenkins has a [plugin for that](https://wiki.jenkins-ci.org/display/JENKINS/Xcode+Plugin).

## Delivery
So that's it. Once you've created the proper build artifacts, namely the `.ipa` file for iOS and `.apk` for Android they can be delivered to your customers.

For a more automated process to build your apps and additionally deliver them to all stakeholders in a smooth and hastle-free workflow visit our [Greenhouse & Relution Guide](./greenhouse.md).
