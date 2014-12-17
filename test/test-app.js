/*global describe, before, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

// local modules
var sampleAnswers = require('../app/sources/sample-answers.js');

describe('m', function () {
  this.timeout(60000); // allow 1 minute to execute

  describe('m --skip-install', function () {
    var answers = sampleAnswers.getStandard();

    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
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
        ['bower.json', 'angular-dynamic-locale": "~0.1.24"'],
        ['bower.json', 'angular-translate": "~2.5.2"'],
        ['bower.json', 'angular-translate-loader-static-files": "~2.5.2"'],
        ['bower.json', 'angular-localForage": "~1.2.2"'],
        ['bower.json', 'angular-touch": "~1.3.7"'],
        ['bower.json', 'fastclick": "~1.0.3"'],
        ['bower.json', 'angular-ui-bootstrap-bower": "~0.12.0"'],
        ['bower.json', 'restangular": "~1.4.0"']
      ]);
    });

    it('has proper app files content', function () {
      assert.fileContent([
        // inject appModule into title
        ['app/index.html', '<title>' + answers.appModule + '</title>'],
        // inject appModule into ng-app
        ['app/index.html', '<body ng-app="' + answers.appModule + '">'],
        // inject appModule into app.js module
        ['app/scripts/app.js', 'angular.module(\'' + answers.appModule + '\',']
      ]);
    });

    it('has proper cordova files content', function () {
      assert.fileContent([
        ['config.xml', '<widget id="' + answers.appId + '"'],
        ['config.xml', '<name>' + answers.appName + '</name>']
      ]);
    });

    // FIXME: cannot test because .yo-rc.json is not available. why?
    // describe('m:controller <lowercasename>', function () {
    //   var controllerName = 'yeah';
    //   before(function (done) {
    //     helpers.run(path.join(__dirname, '../controller'))
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
    //         'angular.module(\'' + answers.appModule + '\')'
    //       ],
    //       [
    //         'app/scripts/controllers/yeah-ctrl.js',
    //         '.controller(\'YeahCtrl\', function')
    //       ]
    //     ]);
    //   });
    // });
  });

  describe('m (latest versions)', function () {
    var answers = sampleAnswers.getLatestVersions();

    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
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
  describe('m with option --app-name', function () {
    var answers = sampleAnswers.getAppNameOption();

    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .withGenerators([ // configure path to  subgenerators
          path.join(__dirname, '../controller'),
          path.join(__dirname, '../partial'),
          path.join(__dirname, '../service')
        ])
        .withOptions({ 'skip-install': true, 'skip-sdk': true, 'app-name': 'tradecore' }) // execute with options
        .withPrompt(answers)  // answer prompts
        .on('end', done);
    });

    it('bower json content', function () {
      assert.fileContent([
        ['bower.json', /"name": "tradecore"/]
      ]);
    });
  });

  // describe('m --skip-prompts', function () {
  //   before(function (done) {
  //     helpers.run(path.join(__dirname, '../app'))
  //       .withGenerators([ // configure path to  subgenerators
  //         path.join(__dirname, '../controller'),
  //         path.join(__dirname, '../partial'),
  //         path.join(__dirname, '../service')
  //       ])
  //       .withOptions({ 'skip-prompts': true}) // execute with options
  //       .on('end', done);
  //   });
  // });
});
