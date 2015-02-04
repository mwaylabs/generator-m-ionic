# generator-m

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage Status][coveralls-image]][coveralls-url]

[npm-image]: https://badge.fury.io/js/generator-m.svg
[npm-url]: https://npmjs.org/package/generator-m
[travis-image]: https://travis-ci.org/mwaylabs/generator-m.svg?branch=master
[travis-url]: https://travis-ci.org/mwaylabs/generator-m
[daviddm-image]: https://david-dm.org/mwaylabs/generator-m.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/mwaylabs/generator-m
[coveralls-image]: https://coveralls.io/repos/mwaylabs/generator-m/badge.png?branch=master
[coveralls-url]: https://coveralls.io/r/mwaylabs/generwator-m?branch=master

## Why you need it
Build mobile Cordova/PhoneGap apps quickly with the tools you love:
Yeoman, Gulp, Bower, AngularJS, Ionic & of course Cordova all in one sexy generator.

## What's in the box
Your technology stack:

- **angular** - https://angularjs.org/
  - **angular-ui-router** - https://github.com/angular-ui/ui-router
- **ionic** - http://ionicframework.com/
  - **ngCordova** - http://ngcordova.com/
- **Cordova** - http://cordova.apache.org/

Additionally we use:

- **yeoman** to scaffold your app - http://yeoman.io/
- **gulp** to run your tasks - http://gulpjs.com/
- **bower** to manage your client packages - http://bower.io/

## Prerequisites
- node `>= 0.10.0` & npm ` >= 1.4.3` - http://nodejs.org/download/
  - yo: `npm install -g yo` - http://yeoman.io/
  - gulp: `npm install -g gulp` - http://gulpjs.com/
  - bower: `npm install -g bower` - http://bower.io/
- Ruby/Sass
  - ruby - https://www.ruby-lang.org/en/installation/
  - sass - http://sass-lang.com/install
- SDKs depending on selected platforms
  - Cordova 4.0 Platform Guides - http://cordova.apache.org/docs/en/4.0.0/guide_platforms_index.md.html#Platform%20Guides


## Install
```
npm install -g generator-m
```

## Usage
**create new directory** - and cd into it. Note: the generator needs an empty directory when you call it
```
mkdir myApp && cd $_
```
**run the generator** - and follow the instructions
```
yo m
```
IMPORTANT: Cordova needs an empty directory to work. Please run any other setup (e.g. `git init`) after running `yo m`.

## Commands
**gulp watch** or **gulp** - prepares everything for development. Get ready to start coding!

```
gulp watch
```
Restart this task when you're adding modules and bower components! This is because gulp will only notify the creation of the new folders, not the individual files inside.


**gulp watch-build** - builds into www and watches version in www (good for debugging your build!)
```
  gulp watch-build
```

**gulp --cordova 'build|run|emulate|prepare platform'** - runs the supplied cordova command, builds your app before
```
  # runs gulp build before running the actual command
  gulp --cordova 'run|build|emulate|prepare <platform>' 
```

**gulp --cordova** - local wrapper for cordova cli (won't use global install to be compatible with generated project)
```
  #arbitrary cordova command
  gulp --cordova 'plugin ls'
```

**gulp config** - manage project configuration
```
  gulp config --setVersion=1.1.0 --setBuild=12 --setBundle=com.new.bundle
```

## sub-generators
### yo m:module - creates a new module
1. `yo m:module <name>` - create a new module
2. add your module to the `app/app.js`:
  
  ```
  'use strict';
  angular.module('myProject', [
    // your modules
    'main',
    '<newModuleName>'
  ]);
  ```
3. restart `gulp watch`
3. navigate to `http://127.0.0.1:9000/#/<module-name-in-snake-case>` in your browser.
4. **Done!** - see your new module in action!


### yo m:others
```
  yo m:controller <name> <module>(optional - defaults to main)
  yo m:template <name> <module>(optional - defaults to main)
  yo m:service <name> <module>(optional - defaults to main)
```

## Troubleshooting
If you're experiencing difficulties using the generator please refer to the [Troubleshooting](https://github.com/mwaylabs/generator-m/wiki/Troubleshooting) section in our wiki!

## Continuous Integration
For now we provide a rudimentary `jenkins.sh` template that can be configured to build your projects with jenkins.

## Options
```
yo m --skip-sdk # skip adding cordova platforms and plugins (sdk-specific) for travis
yo m --appName='App Name' # set appName via CLI
yo m --skip-welcome-message # skips welcome message
yo m --skip-prompts # for debugging purposes, run with predefined answers
yo m --skip-install # for debugging purposes, no npm and bower install
```


## Want to contribute?
Start by reading our:

1. [Mission Statement](https://github.com/mwaylabs/generator-m/wiki/Mission-Statement)
1. [Contribution Guide](https://github.com/mwaylabs/generator-m/wiki/Contribution-Guide)


### License
Code licensed under MIT. Docs under Apache 2. PhoneGap is a trademark of Adobe.
