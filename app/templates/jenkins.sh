#!/bin/bash

# TODO: clone repository

# install dependencies
npm install
bower install
gulp cordova-install

# gulp build
gulp build

# TODO: cordova builds etc...
