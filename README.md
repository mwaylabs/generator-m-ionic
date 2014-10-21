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
  - sass - http://sass-lang.com/install
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

## Commands
**gulp watch** - start livereload and watch for changes in files. Automatically injects deps into index.html and opens your default browsers

```
gulp watch
```

**gulp build** - build your assets into www and injects proper cordova.js
```
  gulp build --platform <platform>
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

cordova build/run
```
  gulp --cordova 'run|build <platform>' 
  # runs gulp build with requested platform
  # also injects appropriate cordova.js
```

## sub-generators
```
  yo m:controller <name>
  yo m:partial <name>
  yo m:service <name>
```



## Contribute

### Manifest
- purpose-agnostic, not technology-agnostic 
  - fit nicely in node, npm, bower, yeoman, cordova, ... ecosystem
  - develop knowledge to contribute to cordova, ionic, etc...
- enforce standards/best practices/ collect knowledge, experience from our projects -> manifest in code
- improve: efficiency, quality, standardization, structure, project hand-overs, scalability -> excellence
  - solve problems once and not on a per project basis
  - leverage know-how across the team 
- use for: projects, workshops, prototyping
  - quick prototyping
    - separate generator / specific prototyping functionality 
    - standard ionic layout
    - offline data / sample data 
- why
  - more flexibility, control
    - select components: don’t use ionic bundle, own gulp file, ngannotate, ...
    - project specific cordova version
  - don't reinvent the wheel, repackage, redistribute
    - enable and educate users about standard tools out there: cordova, gulp, angular, ionic, ...
    - cordova cli - http://cordova.apache.org/docs/en/3.5.0/guide_cli_index.md.html
      - platform guides etc... - http://cordova.apache.org/docs/en/3.3.0/guide_platforms_ios_index.md.html#iOS%20Platform%20Guide
- other popular projects:
  - ionic cli
  - appgyver - http://www.appgyver.com/
  - cordova cli
  - generator-angular - https://github.com/yeoman/generator-angular
  - generator-gulp-webapp - https://github.com/yeoman/generator-gulp-webapp
  - generator-ionic - https://github.com/diegonetto/generator-ionic
  - generator-gulp-angular - https://github.com/Swiip/generator-gulp-angular 

### Development process & Guidelines

- process:
  - idea -> issue -> discussion -> implementation -> pull-request
- changelogs, roadmaps, proper versioning
  - good example: https://github.com/twbs/ratchet/releases 
- well defined process: github, issues - discussions, pull-requests
- team effort, dialog, discussions
- bring the best techniques together
- github issue categories - check out others - http://ngcordova.com/
  - topics: generator, cordova, gulp, quality assurance, documentation




### Workflow
```
gulp watch
```
will run your tests while you develop

```
npm test
```
will run gulp test

### License
Code licensed under MIT. Docs under Apache 2. PhoneGap is a trademark of Adobe.


