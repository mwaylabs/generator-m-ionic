/*global describe, before, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

describe('m:module', function () {

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

    it('creates files', function () {
      assert.file([
        'app/my-module/my-module.js'
      ]);
    });
    it('module.js has proper content', function () {
      assert.fileContent([
        ['app/my-module/my-module.js', 'angular.module(\'myModule\','],
        ['app/my-module/my-module.js', '.state(\'my-module\','],
        ['app/my-module/my-module.js', 'url: \'/my-module\',']
      ]);
    });
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

    it('creates files', function () {
      assert.file([
        'app/my-module/my-module.js'
      ]);
    });
    it('module.js has proper content', function () {
      assert.fileContent([
        ['app/my-module/my-module.js', 'angular.module(\'myModule\','],
        ['app/my-module/my-module.js', '.state(\'my-module\','],
        ['app/my-module/my-module.js', 'url: \'/my-module\',']
      ]);
    });
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
        .withOptions({ 'sample': 'start'}) // execute with options
        .on('end', done);
    });

    it('creates files', function () {
      assert.file([
        'app/my-module/my-module.js'
      ]);
    });
    it('module.js has proper content', function () {
      assert.fileContent([
        ['app/my-module/my-module.js', '$urlRouterProvider.otherwise(\'/start\');'],
        ['app/my-module/my-module.js', '.state(\'start\','],
        ['app/my-module/my-module.js', 'url: \'/start\',']
      ]);
    });
  });
});
