/*global describe, before, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var config = require(path.join(__dirname, '../utils/config.js'));

describe('m:service', function () {

  describe(' some', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../service'))
        .withArguments('some')
        .on('end', done);
    });

    it('file path, module name, service signature', function () {
      var filePath = 'app/' + config.DEFAULT_MODULE + '/services/some-serv.js';
      assert.fileContent([
        [filePath, 'angular.module(\'' + config.DEFAULT_MODULE + '\')'],
        [filePath, 'service(\'Some\', function ($log) {']
      ]);
    });
  });

  describe('some myModule', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../service'))
        .withArguments('some myModule')
        .on('end', done);
    });

    it('file path, module name, service signature', function () {
      var filePath = 'app/my-module/services/some-serv.js';
      assert.fileContent([
        [filePath, 'angular.module(\'myModule\')'],
        [filePath, 'service(\'Some\', function ($log) {']
      ]);
    });
  });

  describe('some --template=debug', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../service'))
        .withArguments('some')
        .withOptions({ template: 'debug' })
        .on('end', done);
    });

    it('file path, service signature, debug logic', function () {
      var filePath = 'app/main/services/some-serv.js';
      assert.fileContent([
        [filePath, 'service(\'Some\', function ($log, $timeout) {'],
        [filePath, 'this.someData = {'],
        [filePath, 'this.changeBriefly = function ()']
      ]);
    });
  });
});
