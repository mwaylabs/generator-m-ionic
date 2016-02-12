'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

var utils = require('../utils/utils.js');

describe('m-ionic:module', function () {

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
        modulePath + '/styles/' + moduleFolder + '.scss',
        modulePath + '/templates'
      ]);

      // module.js
      var moduleFile = modulePath + '/' + moduleFolder + '.js';
      assert.fileContent(moduleFile, '.state(\'' + moduleName + '\'');
      assert.fileContent(moduleFile, 'url: \'/' + moduleFolder + '\'');

      // config
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

    it('--mainModule (ionicCss) tests', function () {
      assert.file([
        'app/' + moduleFolder + '/constants/env-dev.json',
        'app/' + moduleFolder + '/constants/env-prod.json'
      ]);
    });
  };

  var ionicCssTests = function (moduleName) {
    var moduleFolder = utils.moduleFolder(moduleName);

    it('ionicCss', function () {
      assert.noFileContent('app/' + moduleFolder + '/styles/' + moduleFolder + '.scss', '$light');
    });
  };

  var ionicSassTests = function (moduleName) {
    var moduleFolder = utils.moduleFolder(moduleName);

    it('ionicSass', function () {
      assert.fileContent('app/' + moduleFolder + '/styles/' + moduleFolder + '.scss', '$light');
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
      assert.noFileContent(modulePath + '/styles/' + moduleFolder + '.scss', '$light');
    });
  };

  var tabsTests = function (moduleName, options) {
    var moduleFolder = utils.moduleFolder(moduleName);
    var modulePath = 'app/' + moduleFolder;

    it('tabs tests', function () {
      assert.file([
        modulePath + '/assets/images/yo@2x.png',
      ]);

      var moduleFile = modulePath + '/' + moduleFolder + '.js';
      var serviceFile = modulePath + '/services/' + moduleFolder + '-serv.js';
      var serviceName = utils.serviceName(moduleName);
      var debugCtrlFile, debugCtrlName;
      var debugSpecFile;
      var configName;

      // mainModule tests
      if (options && options.mainModule) {
        debugCtrlFile = modulePath + '/controllers/debug-ctrl.js';
        debugCtrlName = utils.controllerName('Debug');
        debugSpecFile = 'test/protractor/main/debug.spec.js';
        configName = utils.configName();

        // module.js
        assert.fileContent(moduleFile, 'otherwise(\'/' + moduleFolder + '/list');
      }
      // no mainModule test
      else {
        debugCtrlFile = modulePath + '/controllers/' + moduleFolder + '-debug-ctrl.js';
        debugCtrlName = utils.controllerName(moduleName + 'Debug');
        debugSpecFile = 'test/protractor/' + moduleFolder + '/debug.spec.js';
        configName = utils.configName(moduleName);

        // module.js
        assert.noFileContent(moduleFile, 'otherwise(\'/');
      }

      // in any case
      assert.fileContent([
        // module.js
        [moduleFile, 'abstract: true'],
        [moduleFile, 'templateUrl: \'' + moduleFolder + '/templates/tabs.html'],
        [moduleFile, '.state(\'' + moduleName + '.list'],
        [moduleFile, 'templateUrl: \'' + moduleFolder + '/templates/list.html'],
        [moduleFile, '.state(\'' + moduleName + '.listDetail'],
        [moduleFile, 'templateUrl: \'' + moduleFolder + '/templates/list-detail.html'],
        [moduleFile, '.state(\'' + moduleName + '.debug'],
        [moduleFile, 'templateUrl: \'' + moduleFolder + '/templates/debug.html'],
        [moduleFile, 'controller: \'' + debugCtrlName + ' as ctrl'],

        // template files
        [debugCtrlFile, 'controller(\'' + debugCtrlName],
        [debugCtrlFile, serviceName + ', ' + configName],
        [debugCtrlFile, 'this.someData = ' + serviceName],
        [debugCtrlFile, 'this.ENV = ' + configName],
        [debugCtrlFile, 'this.BUILD = ' + configName],
        [serviceFile, 'service(\'' + serviceName],
      ]);

      // templates
      assert.fileContent([
        [modulePath + '/templates/debug.html', 'ctrl.someData.binding'],
        [modulePath + '/templates/list-detail.html', 'I scaffold apps'],
        [modulePath + '/templates/list.html', 'Learn more...'],
        [modulePath + '/templates/list.html', moduleName + '.listDetail'],
        [modulePath + '/templates/tabs.html', '<ion-tabs'],
        [modulePath + '/templates/tabs.html', moduleName + '.list'],
        [modulePath + '/templates/tabs.html', moduleName + '.debug'],
      ]);

      // tests
      assert.fileContent([
        [debugSpecFile, 'browser.get(\'/#/' + moduleFolder + '/debug']
      ]);
    });
  };

  describe('main (main, tabs)', function () {
    var options = {
      mainModule: true,
      ionicCss: true
    };

    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/module'))
        .withGenerators([ // configure path to  subgenerators
          path.join(__dirname, '../generators/controller'),
          path.join(__dirname, '../generators/template'),
          path.join(__dirname, '../generators/service'),
          path.join(__dirname, '../generators/constant')
        ])
        .withArguments('main')
        .withPrompts({ template: 'tabs' })
        .withOptions(options)
        .on('end', done);
    });

    basicFilesTests('main', options);
    mainModuleTests('main');
    ionicCssTests('main');
    tabsTests('main', options);
  });

  describe('ionicSass tests', function () {
    var options = {
      mainModule: true,
    };

    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/module'))
        .withGenerators([ // configure path to  subgenerators
          path.join(__dirname, '../generators/controller'),
          path.join(__dirname, '../generators/template'),
          path.join(__dirname, '../generators/service'),
          path.join(__dirname, '../generators/constant')
        ])
        .withArguments('main')
        .withPrompts({ template: 'tabs'})
        .withOptions(options)
        .on('end', done);
    });

    ionicSassTests('main');
  });

  describe('myModule (no main, tabs)', function () {

    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/module'))
        .withGenerators([ // configure path to  subgenerators
          path.join(__dirname, '../generators/controller'),
          path.join(__dirname, '../generators/template'),
          path.join(__dirname, '../generators/service'),
          path.join(__dirname, '../generators/constant')
        ])
        .withArguments('myModule')
        .withPrompts({ template: 'tabs' })
        .on('end', done);
    });

    basicFilesTests('myModule');
    noMainModuleTests('myModule');
    tabsTests('myModule');
  });

  var sideMenuTests = function (moduleName, options) {
    var moduleFolder = utils.moduleFolder(moduleName);
    var modulePath = 'app/' + moduleFolder;

    it('sideMenu tests', function () {
      assert.file([
        modulePath + '/assets/images/yo@2x.png',
      ]);

      var moduleFile = modulePath + '/' + moduleFolder + '.js';
      var serviceFile = modulePath + '/services/' + moduleFolder + '-serv.js';
      var serviceName = utils.serviceName(moduleName);
      var debugCtrlFile, debugCtrlName;
      var menuCtrlFile, menuCtrlName;
      var configName;

      // mainModule tests
      if (options && options.mainModule) {
        menuCtrlFile = modulePath + '/controllers/menu-ctrl.js';
        menuCtrlName = utils.controllerName('Menu');
        debugCtrlFile = modulePath + '/controllers/debug-ctrl.js';
        debugCtrlName = utils.controllerName('Debug');
        configName = utils.configName();

        // module.js
        assert.fileContent(moduleFile, 'otherwise(\'/' + moduleFolder + '/list');
      }
      // no mainModule test
      else {
        menuCtrlFile = modulePath + '/controllers/' + moduleFolder + '-menu-ctrl.js';
        menuCtrlName = utils.controllerName(moduleName + 'Menu');
        debugCtrlFile = modulePath + '/controllers/' + moduleFolder + '-debug-ctrl.js';
        debugCtrlName = utils.controllerName(moduleName + 'Debug');
        configName = utils.configName(moduleName);

        // module.js
        assert.noFileContent(moduleFile, 'otherwise(\'/');
      }

      // in any case
      assert.fileContent([
        // module.js
        [moduleFile, 'abstract: true'],
        [moduleFile, 'templateUrl: \'' + moduleFolder + '/templates/menu.html'],
        [moduleFile, 'controller: \'' + menuCtrlName + ' as menu\''],
        [moduleFile, '.state(\'' + moduleName + '.list'],
        [moduleFile, 'templateUrl: \'' + moduleFolder + '/templates/list.html'],
        [moduleFile, '.state(\'' + moduleName + '.listDetail'],
        [moduleFile, 'templateUrl: \'' + moduleFolder + '/templates/list-detail.html'],
        [moduleFile, '.state(\'' + moduleName + '.debug'],
        [moduleFile, 'templateUrl: \'' + moduleFolder + '/templates/debug.html'],
        [moduleFile, 'controller: \'' + debugCtrlName + ' as ctrl'],

        // template files
        [debugCtrlFile, 'controller(\'' + debugCtrlName],
        [debugCtrlFile, serviceName + ', ' + configName],
        [debugCtrlFile, 'this.someData = ' + serviceName],
        [debugCtrlFile, 'this.ENV = ' + configName],
        [debugCtrlFile, 'this.BUILD = ' + configName],
        [serviceFile, 'service(\'' + serviceName],
        [menuCtrlFile, 'controller(\'' + menuCtrlName],
      ]);

      // templates
      assert.fileContent([
        [modulePath + '/templates/debug.html', 'ctrl.someData.binding'],
        [modulePath + '/templates/list-detail.html', 'I scaffold apps'],
        [modulePath + '/templates/list.html', 'Learn more...'],
        [modulePath + '/templates/list.html', moduleName + '.listDetail'],
        [modulePath + '/templates/menu.html', '<ion-side-menu'],
        [modulePath + '/templates/menu.html', moduleName + '.list'],
        [modulePath + '/templates/menu.html', moduleName + '.debug'],
      ]);

    });
  };

  describe('main (main, sidemenu)', function () {
    var options = {
      mainModule: true
    };

    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/module'))
        .withGenerators([ // configure path to  subgenerators
          path.join(__dirname, '../generators/controller'),
          path.join(__dirname, '../generators/template'),
          path.join(__dirname, '../generators/service'),
          path.join(__dirname, '../generators/constant')
        ])
        .withArguments('main')
        .withPrompts({ template: 'sidemenu' })
        .withOptions(options)
        .on('end', done);
    });

    basicFilesTests('main', options);
    mainModuleTests('main');
    sideMenuTests('main', options);
  });

  describe('myModule (no main, sidemenu)', function () {

    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/module'))
        .withGenerators([ // configure path to  subgenerators
          path.join(__dirname, '../generators/controller'),
          path.join(__dirname, '../generators/template'),
          path.join(__dirname, '../generators/service'),
          path.join(__dirname, '../generators/constant')
        ])
        .withArguments('myModule')
        .withPrompts({ template: 'sidemenu' })
        .on('end', done);
    });

    basicFilesTests('myModule');
    noMainModuleTests('myModule');
    sideMenuTests('myModule');
  });

  var blankTests = function (moduleName) {
    var moduleFolder = utils.moduleFolder(moduleName);
    var modulePath = 'app/' + moduleFolder;

    it('blank tests', function () {
      assert.noFile([
        modulePath + '/assets/images/yo@2x.png',
      ]);

      // module.js
      var moduleFile = modulePath + '/' + moduleFolder + '.js';
      assert.fileContent(moduleFile, 'view-title="' + moduleName + '">');
      assert.fileContent(moduleFile, moduleFolder + '/templates');
    });
  };

  describe('main (main, blank)', function () {
    var options = {
      mainModule: true
    };

    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/module'))
        .withGenerators([ // configure path to subgenerators
          path.join(__dirname, '../generators/controller'),
          path.join(__dirname, '../generators/template'),
          path.join(__dirname, '../generators/service'),
          path.join(__dirname, '../generators/constant')
        ])
        .withPrompts({ template: 'blank' })
        .withOptions(options)
        .withArguments('main')
        .on('end', done);
    });

    basicFilesTests('main', options);
    mainModuleTests('main');
    blankTests('main', options);
  });

  describe('myModule (no main, blank)', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/module'))
        .withGenerators([ // configure path to subgenerators
          path.join(__dirname, '../generators/controller'),
          path.join(__dirname, '../generators/template'),
          path.join(__dirname, '../generators/service'),
          path.join(__dirname, '../generators/constant')
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
