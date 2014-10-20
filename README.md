# generator-m

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-url]][daviddm-image] [![Coverage Status][coveralls-image]][coveralls-url]

[npm-url]: https://npmjs.org/package/gemerator-m
[npm-image]: https://badge.fury.io/js/gemerator-m.svg
[travis-url]: https://travis-ci.org/mwaylabs/gemerator-m
[travis-image]: https://travis-ci.org/mwaylabs/gemerator-m.svg?branch=master
[daviddm-url]: https://david-dm.org/mwaylabs/gemerator-m.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/mwaylabs/gemerator-m
[coveralls-url]: https://coveralls.io/r/mwaylabs/gemerator-m
[coveralls-image]: https://coveralls.io/repos/mwaylabs/gemerator-m/badge.png

##Supported Platforms
- ios
- android

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

## sub-generator
```
  yo m:angular controller <name>
  yo m:angular partial <name>
  yo m:angular service <name>
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
