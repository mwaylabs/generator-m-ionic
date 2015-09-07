'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var pkg = require('../package.json');

// local modules
var sampleAnswers = require('../generators/app/sources/sample-answers.js');

describe('m', function () {
  this.timeout(60000); // allow 1 minute to execute

  describe('sampleAnswers (--skip-install)', function () {
    var answers = sampleAnswers.getStandard();

    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/app'))
        .withGenerators([ // configure path to subgenerators
          path.join(__dirname, '../generators/module'),
          path.join(__dirname, '../generators/constant'),
          path.join(__dirname, '../generators/controller'),
          path.join(__dirname, '../generators/template'),
          path.join(__dirname, '../generators/service')
        ])
        .withOptions({ 'skip-install': true, 'skip-sdk': true }) // execute with options
        .withPrompts(answers)  // answer prompts
        .on('end', done);
    });

    it('creates config files etc... in root', function () {
      assert.file([
        'app/.eslintrc',
        '.bowerrc',
        '.editorconfig',
        '.gitattributes',
        '.gitignore',
        '.eslintrc',
        '.travis.yml',
        '.yo-rc.json',
        'README.md',
        'bower.json',
        'config.xml',
        'hooks/after_prepare/update_platform_config.js', // one per example
        'gulp/building.js',
        'gulp/configuring.js',
        'gulp/cordova.js',
        'gulp/injecting.js',
        'gulp/linting.js',
        'gulp/testing.js',
        'gulp/watching.js',
        'gulpfile.js',
        'jenkins.sh',
        'karma.conf.js',
        'package.json',
        'protractor.conf.js',
        'res/ios/default/icon.png', // one per example
        'test/karma/.eslintrc', // one per example
      ]);
    });

    it('creates /app files', function () {
      assert.file([
        'app/index.html',
        'app/app.js'
      ]);
    });

    it('creates module named main', function () {
      assert.file([
        'app/main',
        'app/main/main.js',
        'app/main/constants/env-dev.json',
      ]);
    });

    it('creates module of type main', function () {
      // not just any module
      assert.file([
        'app/main/constants/env-dev.json',
      ]);
    });

    it('version injected in README.md', function () {
      assert.fileContent('README.md', '# Generator-M-Ionic v' + pkg.version);
    });

    it('has proper bower.json content', function () {
      assert.fileContent([
        // dependencies, test only one as example
        ['bower.json', 'ionic": "~1.1.0"'],
        // devDependencies, test only on as example
        ['bower.json', 'angular-mocks": "~1.4.5"'],
        // resolutions, test only one as example
        ['bower.json', 'angular": "~1.4.5"'],
        // optional, test all for correctness
        ['bower.json', 'angular-dynamic-locale": "~0.1.27"'],
        ['bower.json', 'angular-translate": "~2.7.2"'],
        ['bower.json', 'angular-translate-loader-static-files": "~2.7.2"'],
        ['bower.json', 'angular-localForage": "~1.2.3"']
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

  describe('ionicCss', function () {
    var answers = sampleAnswers.getStandard({ionicCss: true});

    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/app'))
        .withGenerators([ // configure path to subgenerators
          path.join(__dirname, '../generators/module'),
          path.join(__dirname, '../generators/constant'),
          path.join(__dirname, '../generators/controller'),
          path.join(__dirname, '../generators/template'),
          path.join(__dirname, '../generators/service')
        ])
        .withOptions({ 'skip-install': true, 'skip-sdk': true }) // execute with options
        .withPrompts(answers)  // answer prompts
        .on('end', done);
    });

    it('includes ionic css', function () {
      assert.noFileContent('app/main/styles/main.scss', '$light');
      assert.fileContent('gulp/injecting.js', '.pipe(wiredep.stream())');
      assert.fileContent('gulp/injecting.js', 'var DEST = \'www/fonts\';');
    });
  });

  describe('ionicSass', function () {
    var answers = sampleAnswers.getStandard({ionicCss: false});

    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/app'))
        .withGenerators([ // configure path to subgenerators
          path.join(__dirname, '../generators/module'),
          path.join(__dirname, '../generators/constant'),
          path.join(__dirname, '../generators/controller'),
          path.join(__dirname, '../generators/template'),
          path.join(__dirname, '../generators/service')
        ])
        .withOptions({ 'skip-install': true, 'skip-sdk': true }) // execute with options
        .withPrompts(answers)  // answer prompts
        .on('end', done);
    });

    it('includes ionicSass', function () {
      assert.fileContent('app/main/styles/main.scss', '$light');
      assert.fileContent('gulp/injecting.js', '.pipe(wiredep.stream({exclude: [\'bower_components/ionic/release/css\']}))');
      assert.fileContent('gulp/injecting.js', 'var DEST = \'app/main/assets/fonts\'');
    });
  });

  describe('--app-name=tradecore', function () {
    var answers = sampleAnswers.getForAppNameOption();

    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/app'))
        .withGenerators([ // configure path to  subgenerators
          path.join(__dirname, '../generators/module'),
          path.join(__dirname, '../generators/constant'),
          path.join(__dirname, '../generators/controller'),
          path.join(__dirname, '../generators/template'),
          path.join(__dirname, '../generators/service')
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
            for (var i = 0, newValue; ((newValue = value[i])); i++) {
              assert.fileContent('.yo-rc.json', '"' + newValue + '"');
            }
          }
        }
      }
    });
  };

  describe('--skip-prompts', function () {
    var answers = sampleAnswers.getStandard();

    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/app'))
        .withOptions({ 'skip-install': true, 'skip-sdk': true, 'skip-prompts': true}) // execute with options
        .withGenerators([ // configure path to  subgenerators
          path.join(__dirname, '../generators/module'),
          path.join(__dirname, '../generators/constant'),
          path.join(__dirname, '../generators/controller'),
          path.join(__dirname, '../generators/template'),
          path.join(__dirname, '../generators/service')
        ])
        .withPrompts(answers)  // answer prompts
        .on('end', done);
    });

    yoRcHasAnswers(answers);
  });

  describe('--skip-prompts --ios-only', function () {
    var answers = sampleAnswers.getStandard({'ios-only': true});

    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/app'))
        .withOptions({ 'skip-install': true, 'skip-sdk': true, 'skip-prompts': true, 'ios-only': true}) // execute with options
        .withGenerators([ // configure path to  subgenerators
          path.join(__dirname, '../generators/module'),
          path.join(__dirname, '../generators/constant'),
          path.join(__dirname, '../generators/controller'),
          path.join(__dirname, '../generators/template'),
          path.join(__dirname, '../generators/service')
        ])
        .withPrompts(answers)  // answer prompts
        .on('end', done);
    });

    yoRcHasAnswers(answers);
  });

  describe('--skip-prompts --no-cordova', function () {
    var answers = sampleAnswers.getStandard({'cordova': false});

    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/app'))
        .withOptions({ 'skip-install': true, 'skip-sdk': true, 'skip-prompts': true, 'cordova': false}) // execute with options
        .withGenerators([ // configure path to  subgenerators
          path.join(__dirname, '../generators/module'),
          path.join(__dirname, '../generators/constant'),
          path.join(__dirname, '../generators/controller'),
          path.join(__dirname, '../generators/template'),
          path.join(__dirname, '../generators/service')
        ])
        .withPrompts(answers)  // answer prompts
        .on('end', done);
    });

    yoRcHasAnswers(answers);
  });
});
