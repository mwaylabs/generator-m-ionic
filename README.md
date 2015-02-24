# generator-m

[![NPM version](http://img.shields.io/npm/v/generator-m.svg?style=flat-square)][npm-url] 
[![Coverage Status](http://img.shields.io/coveralls/mwaylabs/generator-m.svg?style=flat-square)][coveralls-url] 
[![Build Status](https://img.shields.io/travis/mwaylabs/generator-m.svg?style=flat-square)][travis-url] 
[![Dependency Status](http://img.shields.io/david/mwaylabs/generator-m.svg?style=flat-square)][daviddm-url]
[![Download Month](http://img.shields.io/npm/dm/generator-m.svg?style=flat-square)][npm-url]

[npm-url]: https://npmjs.org/package/generator-m
[coveralls-url]: https://coveralls.io/r/mwaylabs/generator-m?branch=master
[travis-url]: https://travis-ci.org/mwaylabs/generator-m
[daviddm-url]: https://david-dm.org/mwaylabs/generator-m


## Why you need it
Build mobile Cordova/PhoneGap apps quickly with the tools you love:
Yeoman, Gulp, Bower, AngularJS, Ionic & of course Cordova. All in one sexy generator.

### What's in the box

<p align="center">
  <a href="http://yeoman.io/" target="_blank">
    <img height="100" src="https://cloud.githubusercontent.com/assets/1370779/6041228/c1f91cac-ac7a-11e4-9c85-1a5298e29067.png">
  </a>
  <a href="http://gulpjs.com/" target="_blank">
    <img height="100" src="https://cloud.githubusercontent.com/assets/1370779/6041282/34b4a914-ac7b-11e4-8f24-86795ccf49df.png">
  </a>
  <a href="http://bower.io/" target="_blank">
    <img height="100" src="https://cloud.githubusercontent.com/assets/1370779/6041250/ef9a78b8-ac7a-11e4-9586-7e7e894e201e.png">
  </a>
  <a href="https://angularjs.org/" target="_blank">
    <img height="100" src="https://cloud.githubusercontent.com/assets/1370779/6041199/5978cb96-ac7a-11e4-9568-829e2ea4312f.png">
  </a>
  <a href="http://ionicframework.com/" target="_blank">
    <img height="100" src="https://cloud.githubusercontent.com/assets/1370779/6041296/59c5717a-ac7b-11e4-9d5d-9c5232aace64.png">
  </a>
  <a href="http://cordova.apache.org/" target="_blank">
    <img height="100" src="https://cloud.githubusercontent.com/assets/1370779/6041269/20ed1196-ac7b-11e4-8707-68fa331f1aeb.png">
  </a>
</p>
We use:

- **yeoman** to scaffold your app - http://yeoman.io/
- **gulp** to run your tasks - http://gulpjs.com/
- **bower** to manage your client packages - http://bower.io/


Working nicely with the following technology stack:

- **angular** - https://angularjs.org/
  - **angular-ui-router** - https://github.com/angular-ui/ui-router
- **ionic** - http://ionicframework.com/
  - **ngCordova** - http://ngcordova.com/
- **Cordova** - http://cordova.apache.org/

## Install
```
npm install -g generator-m
```
### Prerequisites
- node `>= 0.10.0` & npm ` >= 1.4.3` - http://nodejs.org/download/
  - yo: `npm install -g yo` - http://yeoman.io/
  - gulp: `npm install -g gulp` - http://gulpjs.com/
  - bower: `npm install -g bower` - http://bower.io/
- Ruby/Sass
  - ruby - https://www.ruby-lang.org/en/installation/
  - sass - http://sass-lang.com/install
- SDKs depending the platforms you want to use
  - Cordova 4.0 Platform Guides - http://cordova.apache.org/docs/en/4.0.0/guide_platforms_index.md.html#Platform%20Guides

## Generate App
**create new directory** - and cd into it. 
```
mkdir myApp && cd $_
```
**run the generator** - and follow the instructions
```
yo m
```
**IMPORTANT:** Cordova needs an empty directory to work. Please run any other setup (e.g. `git init`) after running `yo m`.

## Gulp tasks
#### gulp watch
Prepares everything for development. Get ready to start coding!
```
gulp watch
```
Livereloads your application when changing/adding/deleting files to immediately reflect the changes you made. Restart this task when you're adding modules and bower components! This is because gulp will only notify the creation of the new folders, not the individual files inside.


#### gulp watch-build
Builds into www and watches version in www. Good for debugging your build!
```
gulp watch-build
```


#### gulp --cordova 'run any command'
A local wrapper for cordova cli (won't use global install to be compatible with generated project). For instance instead of running `cordova plugins ls` you'd write the following to list all the installed plugins:
```
gulp --cordova 'plugin ls'
```
Head over to the [cordova documentation](http://cordova.apache.org/docs/en/4.0.0/guide_cli_index.md.html) to learn how to use the cordova cli. Remember that when using generator-m you don't need to install cordova globally!

Additionally: If you run one of the following cordova commands: `build <platform>`, `run <platform>`, `emulate <platform>`, `prepare <platform>`, then `gulp build` will build your app into the www folder before cordova will take it from there. Sometimes this is not what you want. Simply add the `--no-build` option and `gulp build` will be skipped.

#### gulp build
Builds your angular app and moves it to the www folder. Usually you don't run this command directly, but it will be implicitly run by `gulp watch-build` and any build-related cordova tasks (as explained above).
```
gulp build
```
Note that the build will not complete if you have any jscs, jshint or jsonlint errors in your code! Sometimes it's necessary to let the build run anyway. Simply use the `--force-build` option. This will also work for all the build-related cordova tasks!

#### gulp environment
Handles your environments (dev, prod, and any other you'd like). 

##### How does it work?
Your `main` module contains the two files `env-dev.json` and `env-prod.json` located under `app/main/constants/`. Any key value pair you define in those files will be copied into the `Config.ENV` constant located in `app/main/constants/config-const.js`. So when you're working on dev, all key value pairs from the `main` module's `env-dev.json` will be copied to your `config-const.js`. Simply inject the `Config` constant in any service or controller where you need to use it.

##### Choosing an environment
When you run `gulp watch` or `gulp build` it will default to the dev environment:
```shell
gulp watch #defaults to --env=dev
gulp build #so does this
```
Alternatively you can run the following to switch to the prod environment
```shell
gulp watch --env=prod
gulp build --env=prod
```
While you're running `gulp watch` you can even switch the environment you're currently working on without having to restart your watch task. Simply type:
```shell
gulp environment --env=<env>
```
Gulp will livereload with your new environment!

##### Creating a new environment
If you find yourself faced needing more than a dev and a prod environment simply create a new file: `app/main/constants/dev-env5.json`, fill it with the desired values and then run one the following:
```shell
gulp watch --env=env5
gulp build --env=env5
gulp environment --env=env5
```

##### Environments when using several modules
In case your project grows large and you have several modules in your project you will probably find yourself wanting to share environments across all modules. No problem. Every module you create has it's own `Config` constant located in `app/module/constants/config-const.js`. But only your `main` module contains the actual environments. The gulp tasks will automatically copy the environments to all of your modules' `Config.ENV` constants.




#### gulp config
Manages project configuration. Modifies cordova's `config.xml`
```
gulp config --setVersion=1.1.0 --setBuild=12 --setBundle=com.new.bundle
```

## running on windows
The generator should work just like on unix/mac except there's one difference, when running `gulp --cordova` tasks. They need doublequotes. So write this:
```sh
gulp --cordova "run ios" # will work on windows
```
instead of this:
```sh
gulp --cordova 'run ios' # won't work on windows
```

## sub-generators
#### yo m:module - creates a new module
1. `yo m:module <moduleName>` - create a new module
2. add your module to the `app/app.js`:
  
  ```js
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


#### yo m:others
The `<moduleName>` is optional and defaults to the main module when left blank
```
yo m:constant <constantName> <moduleName>
yo m:controller <controllerName> <moduleName>
yo m:directive <directiveName> <moduleName>
yo m:filter <filterName> <moduleName>
yo m:template <templateName> <moduleName>
yo m:service <serviceName> <moduleName>
```

## Setup & Developer Options
```
yo m --skip-sdk # skip adding cordova platforms and plugins (sdk-specific) for travis
yo m --appName='App Name' # set appName via CLI
yo m --skip-welcome-message # skips welcome message
yo m --skip-prompts # for debugging purposes, run with predefined answers
yo m --skip-install # for debugging purposes, no npm and bower install
```


## Troubleshooting
If you're experiencing difficulties using the generator please refer to the [Troubleshooting](https://github.com/mwaylabs/generator-m/wiki/Troubleshooting) section in our wiki!

## Continuous Integration
For now we provide a rudimentary `jenkins.sh` template that can be configured to build your projects with jenkins.

## Want to contribute?
Start by reading our:

1. [Mission Statement](https://github.com/mwaylabs/generator-m/wiki/Mission-Statement)
1. [Contribution Guide](https://github.com/mwaylabs/generator-m/wiki/Contribution-Guide)


## License
Code licensed under MIT. Docs under Apache 2. PhoneGap is a trademark of Adobe.
