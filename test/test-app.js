/*global describe, before, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var pkg = require('../package.json');

// local modules
var sampleAnswers = require('../app/sources/sample-answers.js');

describe('m', function () {
  this.timeout(60000); // allow 1 minute to execute

  describe('m --skip-install', function () {
    var answers = sampleAnswers.getStandard();

    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .withGenerators([ // configure path to subgenerators
          path.join(__dirname, '../module'),
          path.join(__dirname, '../constant'),
          path.join(__dirname, '../controller'),
          path.join(__dirname, '../template'),
          path.join(__dirname, '../service')
        ])
        .withOptions({ 'skip-install': true, 'skip-sdk': true }) // execute with options
        .withPrompts(answers)  // answer prompts
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
        '.travis.yml',
        '.yo-rc.json',
        'README.md',
        'bower.json',
        'config.xml',
        'gulpfile.js',
        'jenkins.sh',
        'package.json',
        'gulp_tasks/building.js',
        'gulp_tasks/configuring.js',
        'gulp_tasks/cordova.js',
        'gulp_tasks/injecting.js',
        'gulp_tasks/linting.js',
        'gulp_tasks/watching.js'
      ]);
    });

    it('creates /app files', function () {
      assert.file([
        'app/index.html',
        'app/app.js',
        'app/main',
        'app/main/main.js',
      ]);
    });

    it('version injected in README.md', function () {
      assert.fileContent('README.md', '# Generator-M v' + pkg.version);
    });

    it('has proper bower.json content', function () {
      assert.fileContent([
        // dependencies, test only one as example
        ['bower.json', 'ionic": "~1.0.0"'],
        // resolutions, test only one as example
        ['bower.json', 'angular": "~1.3.15"'],
        // optional, test all for correctness
        ['bower.json', 'angular-dynamic-locale": "~0.1.27"'],
        ['bower.json', 'angular-translate": "~2.7.0"'],
        ['bower.json', 'angular-translate-loader-static-files": "~2.7.0"'],
        ['bower.json', 'angular-localForage": "~1.2.2"']
      ]);
    });

    it('has proper app files content', function () {
      assert.fileContent([
        // inject appModule into title
        ['app/index.html', '<title>' + answers.appName + '</title>'],
        // proper css path
        ['app/index.html', '<body ng-app="' + answers.appModule + '">'],
        // inject appModule into app.js module
        ['app/app.js', 'angular.module(\'' + answers.appModule + '\','],
        // inject appModule.main into app.js module
        ['app/app.js', '\'main\''],
      ]);
    });

    it('has proper cordova files content', function () {
      assert.fileContent([
        ['config.xml', '<widget id="' + answers.appId + '"'],
        ['config.xml', '<name>' + answers.appName + '</name>']
      ]);
    });
  });

  describe('m --app-name=tradecore', function () {
    var answers = sampleAnswers.getForAppNameOption();

    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .withGenerators([ // configure path to  subgenerators
          path.join(__dirname, '../module'),
          path.join(__dirname, '../constant'),
          path.join(__dirname, '../controller'),
          path.join(__dirname, '../template'),
          path.join(__dirname, '../service')
        ])
        .withOptions({ 'skip-install': true, 'skip-sdk': true, 'app-name': 'tradecore' }) // execute with options
        .withPrompts(answers)  // answer prompts
        .on('end', done);
    });

    it('bower json content', function () {
      assert.fileContent([
        ['bower.json', /"name": "tradecore"/]
      ]);
    });
  });

  var yoRcHasAnswers = function (answers) {
    it('.yo-rc.json has proper answers', function () {
      for (var key in answers) {
        if (answers.hasOwnProperty(key)) {
          var value = answers[key];
          if (typeof value === 'string') {
            assert.fileContent('.yo-rc.json', '"' + key + '": "' + value + '"');
          }
          else if (Object.prototype.toString.call(value) === '[object Array]') {
            for (var i = 0, newValue; (newValue = value[i]); i++) {
              assert.fileContent('.yo-rc.json', '"' + newValue + '"');
            }
          }
        }
      }
    });
  };

  describe('m --skip-prompts', function () {
    var answers = sampleAnswers.getStandard();

    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .withOptions({ 'skip-install': true, 'skip-sdk': true, 'skip-prompts': true}) // execute with options
        .withGenerators([ // configure path to  subgenerators
          path.join(__dirname, '../module'),
          path.join(__dirname, '../constant'),
          path.join(__dirname, '../controller'),
          path.join(__dirname, '../template'),
          path.join(__dirname, '../service')
        ])
        .withPrompts(answers)  // answer prompts
        .on('end', done);
    });

    yoRcHasAnswers(answers);
  });

  describe('m --skip-prompts --ios-only', function () {
    var answers = sampleAnswers.getStandard({'ios-only': true});

    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .withOptions({ 'skip-install': true, 'skip-sdk': true, 'skip-prompts': true, 'ios-only': true}) // execute with options
        .withGenerators([ // configure path to  subgenerators
          path.join(__dirname, '../module'),
          path.join(__dirname, '../constant'),
          path.join(__dirname, '../controller'),
          path.join(__dirname, '../template'),
          path.join(__dirname, '../service')
        ])
        .withPrompts(answers)  // answer prompts
        .on('end', done);
    });

    yoRcHasAnswers(answers);
  });

  describe('m --skip-prompts --no-cordova', function () {
    var answers = sampleAnswers.getStandard({'cordova': false});

    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .withOptions({ 'skip-install': true, 'skip-sdk': true, 'skip-prompts': true, 'cordova': false}) // execute with options
        .withGenerators([ // configure path to  subgenerators
          path.join(__dirname, '../module'),
          path.join(__dirname, '../constant'),
          path.join(__dirname, '../controller'),
          path.join(__dirname, '../template'),
          path.join(__dirname, '../service')
        ])
        .withPrompts(answers)  // answer prompts
        .on('end', done);
    });

    yoRcHasAnswers(answers);
  });
});
