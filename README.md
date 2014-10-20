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



## Dependencies
- iOS SDK
- Android SDK

## Install
```
npm install -g generator-m
```

## Usage
```
mkdir myApp && cd $_
yo m
```

## Commands
**gulp watch** - start livereload and watch for changes in files. Automatically injects deps into index.html

```
gulp watch
```

**gulp build** - build your assets into www
```
  gulp build
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

```
gulp watch
```
will run your tests while you develop

```
npm test
```
will run gulp test

