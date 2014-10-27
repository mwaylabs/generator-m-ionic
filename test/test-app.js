/*global describe, before, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('m:app', function () {
  this.timeout(60000); // allow 1 minute to execute

  describe('m:app --skip-install', function () {
    var answers = {
      'appName': 'tradecore',
      'appId': 'com.mwaysolutions.tradecoreionic',
      'bowerPackages': [
        'angular-dynamic-locale#~0.1.17',
        'angular-localForage#~0.2.10',
        'angular-touch#~1.2.25',
        'angular-translate#~2.4.0',
        'angular-translate-loader-static-files#~2.4.0',
        'angular-ui-bootstrap-bower#~0.11.0',
        'fastclick#~1.0.3',
        'restangular#~1.4.0'
      ],
      'ionicSass': true,
      'stableVersions': true,
      'platforms': [
        'ios',
        'android'
      ],
      'plugins': [
        'org.apache.cordova.device'
      ],
      'includeSass': true,
      'ngTemplate':'Y'
    };

    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(os.tmpdir(), './tmp')) // create new dir
        .withGenerators([ // configure path to  subgenerators
          path.join(__dirname, '../controller'),
          path.join(__dirname, '../partial'),
          path.join(__dirname, '../service')
        ])
        .withOptions({ 'skip-install': true, 'skip-sdk': true }) // execute with options
        .withPrompt(answers)  // answer prompts
        .on('end', done);
    });

    it('creates config files etc... in root', function () {
      assert.file([
        '.bowerrc',
        '.editorconfig',
        '.gitattributes',
        '.gitignore',
        '.jscsrc',
        '.jshintignore',
        '.jshintrc',
        '.yo-rc.json',
        'README.md',
        'bower.json',
        'config.xml',
        'gulpfile.js',
        'package.json'
      ]);
    });

    it('creates /app files', function () {
      assert.file([
        'app/index.html',
        'app/partials/start.html',
        'app/scripts/app.js',
        'app/scripts/controllers/start-ctrl.js',
        'app/scripts/services/start.js',
        'app/scripts/templates.js',
        'app/styles/main.scss'
      ]);
    });

    it('creates cordova files', function () {
      assert.file([
        'hooks',
        'platforms',
        'plugins',
        'www'
      ]);
    });

    it('has proper bower.json content', function () {
      assert.fileContent([
        ['bower.json', /"angular-dynamic-locale": "~0.1.17"/],
        ['bower.json', /"angular-localForage": "~0.2.10"/],
        ['bower.json', /"angular-touch": "~1.2.25"/],
        ['bower.json', /"angular-translate": "~2.4.0"/],
        ['bower.json', /"angular-translate-loader-static-files": "~2.4.0"/],
        ['bower.json', /"angular-ui-bootstrap-bower": "~0.11.0"/],
        ['bower.json', /"fastclick": "~1.0.3"/],
        ['bower.json', /"restangular": "~1.4.0"/]
      ]);
    });

    it('has proper app files content', function () {
      assert.fileContent([
        // inject appname into title
        ['app/index.html', new RegExp('<title>' + answers.appName + '</title>')],
        // inject appname into ng-app
        ['app/index.html', new RegExp('<body ng-app="' + answers.appName + '">')],
        // inject appname into app.js module
        ['app/scripts/app.js', new RegExp('angular\\.module\\(\'' + answers.appName + '\',')]
      ]);
    });

    it('has proper cordova files content', function () {
      assert.fileContent([
        ['config.xml', new RegExp('<widget id="' + answers.appId + '"')],
        ['config.xml', new RegExp('<name>' + answers.appName + '</name>')]
      ]);
    });

    // FIXME: cannot test because .yo-rc.json is not available. why?
    // describe('m:controller <lowercasename>', function () {
    //   var controllerName = 'yeah';
    //   before(function (done) {
    //     helpers.run(path.join(__dirname, '../controller'))
    //       .inDir(path.join(os.tmpdir(), './tmp')) // create new dir
    //       .withArguments([controllerName])
    //       .on('end', done);
    //   });

    //   it('generates a new controller with proper content', function () {
    //     assert.file([
    //       'app/scripts/controllers/yeah-ctrl.js'
    //     ]);
    //     assert.fileContent([
    //       [
    //         'app/scripts/controllers/yeah-ctrl.js',
    //         new RegExp('angular\\.module\\(\'' + answers.appName + '\')')
    //       ],
    //       [
    //         'app/scripts/controllers/yeah-ctrl.js',
    //         new RegExp('\\.controller\\(\'YeahCtrl\'\\, function')
    //       ]
    //     ]);
    //   });
    // });
  });

  describe('m:app (latest versions)', function () {
    var answers = {
      'appName': 'tradecore',
      'appId': 'com.mwaysolutions.tradecoreionic',
      'bowerPackages': [
        'angular-dynamic-locale#~0.1.17',
        'angular-localForage#~0.2.10',
        'angular-touch#~1.2.25',
        'angular-translate#~2.4.0',
        'angular-translate-loader-static-files#~2.4.0',
        'angular-ui-bootstrap-bower#~0.11.0',
        'fastclick#~1.0.3',
        'restangular#~1.4.0'
      ],
      'ionicSass': true,
      'stableVersions': false,
      'platforms': [
        'ios',
        'android'
      ],
      'plugins': [
        'org.apache.cordova.device'
      ],
      'includeSass': true,
      'ngTemplate':'Y'
    };

    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(os.tmpdir(), './temp-test')) // create new dir
        .withGenerators([ // configure path to  subgenerators
          path.join(__dirname, '../controller'),
          path.join(__dirname, '../partial'),
          path.join(__dirname, '../service')
        ])
        .withOptions({ 'skip-install': true, 'skip-sdk': true }) // execute with options
        .withPrompt(answers)  // answer prompts
        .on('end', done);
    });

    it('bower json content', function () {
      assert.fileContent([
        ['bower.json', /"angular-dynamic-locale": "latest"/],
        ['bower.json', /"angular-localForage": "latest"/],
        ['bower.json', /"angular-touch": "latest"/],
        ['bower.json', /"angular-translate": "latest"/],
        ['bower.json', /"angular-translate-loader-static-files": "latest"/],
        ['bower.json', /"angular-ui-bootstrap-bower": "latest"/],
        ['bower.json', /"fastclick": "latest"/],
        ['bower.json', /"restangular": "latest"/]
      ]);
    });
  });
});
