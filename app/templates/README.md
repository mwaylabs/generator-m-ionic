# README

##Supported Platforms
- ios
- android

## Commands
**gulp watch** - start livereload and watch for changes in files. Automatically injects deps into index.html

  gulp watch

**gulp build** - build your assets into www
  
  gulp build
  gulp build --platform <platform>

**gulp serve-build** - serve version from www

  gulp serve-build

**gulp --cordova ** - local wrapper for cordova cli (won't use global install to be compatible with generated project)
  
  #arbitrary cordova command
  gulp --cordova 'plugin ls'

cordova build/run
  
  gulp --cordova 'run|build <platform>' 
  # runs gulp build with requested platform
  # also injects appropriate cordova.js

## Generators

  yo m:angular controller <name>
  yo m:angular partial <name>
  yo m:angular service <name>

