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
        modulePath + '/styles/main.scss',
        modulePath + '/templates'
      ]);
    });
  };

  var moduleJsContentTests = function (moduleFolder) {
    var modulePath = 'app/' + moduleFolder;
    var moduleJsPath = modulePath + '/' + moduleFolder + '.js';
    it('module.js has proper content', function () {
      assert.fileContent([
        [moduleJsPath, 'angular.module(\'myModule\','],
        [moduleJsPath, '.state(\'' + moduleFolder + '\','],
        [moduleJsPath, 'url: \'/my-module\',']
      ]);
    });

    it('main.scss is empty', function () {
      assert.noFileContent(modulePath + '/styles/main.scss', '$light');
    });
  };

  var moduleFilesTests = function (moduleFolder) {
    it('start files', function () {
      var modulePath = 'app/' + moduleFolder;

      assert.file([
        modulePath + '/controllers/start-ctrl.js',
        modulePath + '/services/start-serv.js',
        modulePath + '/templates/start.html',
        modulePath + '/constants/config-const.js'
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
    moduleJsContentTests('my-module');
    moduleFilesTests('my-module');
  });

  describe('m:module my-module', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../module'))
        .withGenerators([ // configure path to subgenerators
          path.join(__dirname, '../controller'),
          path.join(__dirname, '../template'),
          path.join(__dirname, '../service'),
          path.join(__dirname, '../constant')
        ])
        .withArguments('my-module')
        .on('end', done);
    });

    fileCreationTests('my-module');
    moduleJsContentTests('my-module');
    moduleFilesTests('my-module');
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
    moduleFilesTests('main');

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
        ['app/main/main.js', 'controller: \'StartCtrl as start\'']
      ]);
    });

    it('main.scss has ionic includes', function () {
      assert.fileContent('app/main/styles/main.scss', '$light');
    });
  });
});
