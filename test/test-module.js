/*global describe, before, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

describe('m:module', function () {

  var fileCreationTests = function (moduleFolder) {
    var modulePath = 'app/' + moduleFolder;

    it('creates files and folders', function () {
      assert.file([
        modulePath + '/' + moduleFolder + '.js',
        modulePath + '/assets/images/yo@2x.png',
        modulePath + '/constants',
        modulePath + '/controllers',
        modulePath + '/directives',
        modulePath + '/filters',
        modulePath + '/services',
        modulePath + '/styles/module.scss',
        modulePath + '/templates'
      ]);
    });
  };

  describe('m:module myModule', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../module'))
        .withGenerators([ // configure path to subgenerators
          path.join(__dirname, '../controller'),
          path.join(__dirname, '../template'),
          path.join(__dirname, '../service'),
          path.join(__dirname, '../constant')
        ])
        .withArguments('myModule')
        .on('end', done);
    });

    fileCreationTests('my-module');

    var modulePath = 'app/my-module';
    var moduleJsPath = modulePath + '/' + 'my-module' + '.js';
    it('module.js has proper content', function () {
      assert.fileContent([
        [moduleJsPath, 'angular.module(\'myModule\','],
        [moduleJsPath, '.state(\'' + 'my-module' + '\','],
        [moduleJsPath, 'url: \'/my-module\','],
        [moduleJsPath, 'controller: \'MyModuleCtrl as ctrl\'']
      ]);
    });

    it('module.scss is empty', function () {
      assert.noFileContent(modulePath + '/styles/module.scss', '$light');
    });

    it('module files', function () {
      var modulePath = 'app/my-module';

      assert.file([
        modulePath + '/controllers/my-module-ctrl.js',
        modulePath + '/services/my-module-serv.js',
        modulePath + '/templates/my-module.html',
        modulePath + '/constants/my-module-config-const.js'
      ]);
    });
  });

  describe('m:module main --sample=start', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../module'))
        .withGenerators([ // configure path to  subgenerators
          path.join(__dirname, '../controller'),
          path.join(__dirname, '../template'),
          path.join(__dirname, '../service'),
          path.join(__dirname, '../constant')
        ])
        .withArguments('main')
        .withOptions({ sample: 'start'}) // execute with options
        .on('end', done);
    });

    fileCreationTests('main');

    it('start files', function () {
      var modulePath = 'app/main';

      assert.file([
        modulePath + '/controllers/main-ctrl.js',
        modulePath + '/services/main-serv.js',
        modulePath + '/templates/main.html',
        modulePath + '/constants/config-const.js'
      ]);
    });

    it('env files', function () {
      assert.file([
        'app/main/constants/env-dev.json',
        'app/main/constants/env-prod.json'
      ]);
    });

    it('module.js has proper content', function () {
      assert.fileContent([
        ['app/main/main.js', 'angular.module(\'main\','],
        ['app/main/main.js', '$urlRouterProvider.otherwise(\'/main\');'],
        ['app/main/main.js', '.state(\'main\','],
        ['app/main/main.js', 'url: \'/main\','],
        ['app/main/main.js', 'controller: \'MainCtrl as ctrl\'']
      ]);
    });

    it('module.scss has ionic includes', function () {
      assert.fileContent('app/main/styles/module.scss', '$light');
    });
  });
});
