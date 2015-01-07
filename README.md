# generator-m

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage Status][coveralls-image]][coveralls-url]

[npm-image]: https://badge.fury.io/js/generator-m.svg
[npm-url]: https://npmjs.org/package/generator-m
[travis-image]: https://travis-ci.org/mwaylabs/generator-m.svg?branch=master
[travis-url]: https://travis-ci.org/mwaylabs/generator-m
[daviddm-image]: https://david-dm.org/mwaylabs/generator-m.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/mwaylabs/generator-m
[coveralls-image]: https://coveralls.io/repos/mwaylabs/generator-m/badge.png?branch=master
[coveralls-url]: https://coveralls.io/r/mwaylabs/generator-m?branch=master

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
- `node >= 0.10.0` & `npm >= 1.4.3`
  - http://nodejs.org/download/
- Ruby/Sass
  - ruby - https://www.ruby-lang.org/en/installation/
  - sass - http://sass-lang.com/install -> `gem install sass -v 3.4.5 --ri-doc`
- SDKs depending on selected platforms
  - iOS Cordova 3.5 Platform Guide -http://cordova.apache.org/docs/en/3.5.0/guide_platforms_ios_index.md.html#iOS%20Platform%20Guide
  - Android -http://cordova.apache.org/docs/en/3.5.0/guide_platforms_android_index.md.html#Android%20Platform%20Guide


## Install
**yeoman** - if you don't have it already - http://yeoman.io/

```
npm install -g yo
```

**generator-m**
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
**gulp watch** - start livereload and watch for changes in files. Automatically injects deps into index.html and opens your default browsers

```
gulp watch
```

**gulp build** - build your assets into www, cleans before every build
```
  gulp build
```

**gulp serve-build** - serve version from www
```
  gulp serve-build
```

**gulp --cordova** - local wrapper for cordova cli (won't use global install to be compatible with generated project)
```
  #arbitrary cordova command
  gulp --cordova 'plugin ls'
```

cordova build/run/emulate/prepare
```
  gulp --cordova 'run|build|emulate|prepare <platform>' 
  # runs gulp build
```

**gulp config** - manage project configuration
```
  gulp config --setVersion=1.1.0 --setBuild=12 --setBundle=com.new.bundle
```

## sub-generators
```
  yo m:controller <name>
  yo m:partial <name>
  yo m:service <name>
```

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
