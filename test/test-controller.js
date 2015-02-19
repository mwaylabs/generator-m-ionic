/*global describe, before, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var config = require(path.join(__dirname, '../utils/config.js'));

describe('m:controller', function () {

  describe('m:controller some', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../controller'))
        .withArguments('some')
        .on('end', done);
    });

    it('controller file contents', function () {
      var filePath = 'app/' + config.DEFAULT_MODULE + '/controllers/some-ctrl.js';
      assert.fileContent([
        [filePath, 'angular.module(\'' + config.DEFAULT_MODULE + '\')'],
        [filePath, 'controller(\'SomeCtrl\',']
      ]);
    });
  });

  describe('m:controller someCtrl myModule', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../controller'))
        .withArguments('someCtrl myModule')
        .on('end', done);
    });

    it('controller file contents', function () {
      var filePath = 'app/my-module/controllers/some-ctrl.js';
      assert.fileContent([
        [filePath, 'angular.module(\'myModule\')'],
        [filePath, 'controller(\'SomeCtrl\',']
      ]);
    });
  });

  describe('m:controller someCtrl', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../controller'))
        .withArguments('someCtrl')
        .withOptions({ sample: 'start' })
        .on('end', done);
    });

    it('controller file contents', function () {
      var filePath = 'app/main/controllers/some-ctrl.js';
      assert.fileContent([
        [filePath, ', Start, Config'],
        [filePath, '$scope.someData']
      ]);
    });
  });
});
