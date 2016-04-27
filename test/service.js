'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var config = require(path.join(__dirname, '../utils/config.js'));

describe('generators/service', function () {

  describe('some', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/service'))
        .withArguments('some')
        .on('end', done);
    });

    it('file, module name, service signature', function () {
      var filePath = 'app/' + config.DEFAULT_MODULE + '/services/some-serv.js';
      assert.fileContent([
        [filePath, 'angular.module(\'' + config.DEFAULT_MODULE + '\')'],
        [filePath, 'service(\'Some\', function ($log) {']
      ]);
    });

    it('spec file, default signature, default content', function () {
      var filePath = 'test/karma/' + config.DEFAULT_MODULE + '/some-serv.spec.js';
      assert.fileContent([
        [filePath, 'describe(\'module: main, service: Some'],
        [filePath, 'it(\'should do something']
      ]);
    });
  });

  describe('some myModule', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/service'))
        .withArguments('some myModule')
        .on('end', done);
    });

    it('file, module name, service signature', function () {
      var filePath = 'app/my-module/services/some-serv.js';
      assert.fileContent([
        [filePath, 'angular.module(\'myModule\')'],
        [filePath, 'service(\'Some\', function ($log) {']
      ]);
    });

    it('spec file, default signature', function () {
      var filePath = 'test/karma/my-module/some-serv.spec.js';
      assert.fileContent([
        [filePath, 'describe(\'module: myModule, service: Some'],
      ]);
    });
  });

  describe('some --template=debug', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/service'))
        .withArguments('some')
        .withOptions({ template: 'debug' })
        .on('end', done);
    });

    it('file, service signature, debug logic', function () {
      var filePath = 'app/main/services/some-serv.js';
      assert.fileContent([
        [filePath, 'service(\'Some\', function ($log, $timeout) {'],
        [filePath, 'this.someData = {'],
        [filePath, 'this.changeBriefly = function ()']
      ]);
    });

    it('spec file, debug content', function () {
      var filePath = 'test/karma/' + config.DEFAULT_MODULE + '/some-serv.spec.js';
      assert.fileContent([
        [filePath, 'describe(\'.changeBriefly()']
      ]);
    });
  });
});
