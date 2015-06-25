/*global describe, before, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

var utils = require('../utils/utils.js');

describe('m:module', function () {

  var basicFilesTests = function (moduleName, options) {
    var moduleFolder = utils.moduleFolder(moduleName);
    var modulePath = 'app/' + moduleFolder;

    it('basic files and folders', function () {
      assert.file([
        modulePath + '/' + moduleFolder + '.js',
        modulePath + '/assets/images',
        modulePath + '/constants',
        modulePath + '/controllers',
        modulePath + '/directives',
        modulePath + '/filters',
        modulePath + '/services',
        modulePath + '/styles/module.scss',
        modulePath + '/templates'
      ]);

      var configPath = modulePath + '/constants/';
      var configName = '';
      if (options && options.mainModule) {
        configPath += 'config-const.js';
        configName = utils.configName();
      }
      else {
        configPath += moduleFolder + '-config-const.js';
        configName = utils.configName(moduleName);
      }
      assert.fileContent(configPath, '.constant(\'' + configName + '\'');
      assert.fileContent(configPath, 'ENV: {');
    });
  };

  var mainModuleTests = function (moduleName) {
    var moduleFolder = utils.moduleFolder(moduleName);

    it('--mainModule tests', function () {
      assert.file([
        'app/' + moduleFolder + '/constants/env-dev.json',
        'app/' + moduleFolder + '/constants/env-prod.json'
      ]);
      assert.fileContent('app/' + moduleFolder + '/styles/module.scss', '$light');
    });
  };

  var noMainModuleTests = function (moduleName) {
    var moduleFolder = utils.moduleFolder(moduleName);
    var modulePath = 'app/' + moduleFolder;

    it('no mainModule tests', function () {
      assert.noFile([
        modulePath + '/constants/env-dev.json',
        modulePath + '/constants/env-prod.json'
      ]);
      assert.noFileContent(modulePath + '/styles/module.scss', '$light');
    });
  };

  var tabsTests = function (moduleName, options) {
    var moduleFolder = utils.moduleFolder(moduleName);
    var modulePath = 'app/' + moduleFolder;
    console.log(options);

    it('tabs tests', function () {
      assert.file([
        modulePath + '/assets/images/yo@2x.png',

      ]);
    });
  };

  // var sideMenuTests = function (moduleName, options) {
  //   var moduleFolder = utils.moduleFolder(moduleName);
  //   var modulePath = 'app/' + moduleFolder;

  //   it('sideMenu tests', function () {
  //     assert.file([
  //       modulePath + '/assets/images/yo@2x.png',
  //     ]);

  //     // mainModule tests
  //     if (options.mainModule) {
  //       assert.fileContent([
  //         [
  //           modulePath + '/controllers/debug-ctrl.js',
  //           '.controller(\'DebugCtrl\''
  //         ]
  //       ]);
  //     }
  //     // other module tests
  //     else {

  //     }
  //   });
  // };

  var blankTests = function (moduleName) {
    var moduleFolder = utils.moduleFolder(moduleName);
    var modulePath = 'app/' + moduleFolder;

    it('blank tests', function () {
      assert.noFile([
        modulePath + '/assets/images/yo@2x.png',
      ]);
      // module.js
      var moduleJsPath = modulePath + '/' + moduleFolder + '.js';
      assert.fileContent(moduleJsPath, '.state(\'' + moduleFolder + '\'');
      assert.fileContent(moduleJsPath, 'url: \'/' + moduleFolder + '\'');
      assert.fileContent(moduleJsPath, 'view-title="' + moduleName + '">');
      assert.fileContent(moduleJsPath, moduleFolder + '/templates');
    });
  };

  describe('m:module main --mainModule (tabs)', function () {
    var options = {
      mainModule: true
    };
    before(function (done) {
      helpers.run(path.join(__dirname, '../module'))
        .withGenerators([ // configure path to  subgenerators
          path.join(__dirname, '../controller'),
          path.join(__dirname, '../template'),
          path.join(__dirname, '../service'),
          path.join(__dirname, '../constant')
        ])
        .withArguments('main')
        .withPrompts({ template: 'tabs' })
        .withOptions(options)
        .on('end', done);
    });

    basicFilesTests('main', options);
    mainModuleTests('main');
    tabsTests('main', options);

    it('tab files', function () {
      var modulePath = 'app/main';

      assert.file([
        modulePath + '/controllers/main-ctrl.js',
        modulePath + '/services/main-serv.js',
        modulePath + '/templates/main.html',
        modulePath + '/constants/config-const.js'
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
  });

  describe('m:module myModule (no main, blank)', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../module'))
        .withGenerators([ // configure path to subgenerators
          path.join(__dirname, '../controller'),
          path.join(__dirname, '../template'),
          path.join(__dirname, '../service'),
          path.join(__dirname, '../constant')
        ])
        .withPrompts({ template: 'blank' })
        .withArguments('myModule')
        .on('end', done);
    });

    basicFilesTests('myModule');
    noMainModuleTests('myModule');
    blankTests('myModule');
  });

});
