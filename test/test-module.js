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
        modulePath + '/controllers',
        modulePath + '/directives',
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

  describe('m:module myModule', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../module'))
        .withGenerators([ // configure path to subgenerators
          path.join(__dirname, '../controller'),
          path.join(__dirname, '../template'),
          path.join(__dirname, '../service')
        ])
        .withArguments('myModule')
        .on('end', done);
    });

    fileCreationTests('my-module');
    moduleJsContentTests('my-module');
  });

  describe('m:module my-module', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../module'))
        .withGenerators([ // configure path to subgenerators
          path.join(__dirname, '../controller'),
          path.join(__dirname, '../template'),
          path.join(__dirname, '../service')
        ])
        .withArguments('my-module')
        .on('end', done);
    });

    fileCreationTests('my-module');
    moduleJsContentTests('my-module');
  });

  describe('m:module my-module --sample=start', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../module'))
        .withGenerators([ // configure path to  subgenerators
          path.join(__dirname, '../controller'),
          path.join(__dirname, '../template'),
          path.join(__dirname, '../service')
        ])
        .withArguments('my-module')
        .withOptions({ sample: 'start'}) // execute with options
        .on('end', done);
    });

    fileCreationTests('my-module');

    it('controller template service files', function () {
      var modulePath = 'app/my-module';

      assert.file([
        modulePath + '/controllers/start-ctrl.js',
        modulePath + '/services/start-serv.js',
        modulePath + '/templates/start.html'
      ]);
    });

    it('module.js has proper content', function () {
      assert.fileContent([
        ['app/my-module/my-module.js', 'angular.module(\'myModule\','],
        ['app/my-module/my-module.js', '$urlRouterProvider.otherwise(\'/start\');'],
        ['app/my-module/my-module.js', '.state(\'start\','],
        ['app/my-module/my-module.js', 'url: \'/start\',']
      ]);
    });

    it('main.scss has ionic includes', function () {
      assert.fileContent('app/my-module/styles/main.scss', '$light');
    });
  });
});
