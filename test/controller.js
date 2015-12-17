'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var config = require(path.join(__dirname, '../utils/config.js'));

describe('m-ionic:controller', function () {

  describe('some', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/controller'))
        .withArguments('some')
        .on('end', done);
    });

    it('file, module name, controller signature', function () {
      var filePath = 'app/' + config.DEFAULT_MODULE + '/controllers/some-ctrl.js';
      assert.fileContent([
        [filePath, 'angular.module(\'' + config.DEFAULT_MODULE + '\')'],
        [filePath, 'controller(\'SomeCtrl\', function ($log) {']
      ]);
    });

    it('spec file, default signature, default content', function () {
      var filePath = 'test/karma/' + config.DEFAULT_MODULE + '/some-ctrl.spec.js';
      assert.fileContent([
        [filePath, 'describe(\'module: main, controller: SomeCtrl'],
        [filePath, 'it(\'should do something\', function () {']
      ]);
    });
  });

  describe('someCtrl myModule', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/controller'))
        .withArguments('someCtrl myModule')
        .on('end', done);
    });

    it('file, module name', function () {
      var filePath = 'app/my-module/controllers/some-ctrl.js';
      assert.fileContent([
        [filePath, 'angular.module(\'myModule\')']
      ]);
    });

    it('spec file, default signature', function () {
      var filePath = 'test/karma/my-module/some-ctrl.spec.js';
      assert.fileContent([
        [filePath, 'describe(\'module: myModule, controller: SomeCtrl']
      ]);
    });
  });

  describe('someCtrl --template=debug', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/controller'))
        .withArguments('someCtrl')
        .withOptions({ template: 'debug' })
        .on('end', done);
    });

    it('file, controller signature, debug logic & placeholders', function () {
      var filePath = 'app/main/controllers/some-ctrl.js';
      assert.fileContent([
        [filePath, '$log, Main, Config'],
        [filePath, 'this.someData = Main.'],
        [filePath, 'this.ENV = Config.ENV'],
        [filePath, 'this.BUILD = Config.BUILD'],
        [filePath, 'this.grade = ']
      ]);
    });

    it('spec file, debug content', function () {
      var filePath = 'test/karma/' + config.DEFAULT_MODULE + '/some-ctrl.spec.js';
      assert.fileContent([
        [filePath, 'describe(\'.grade()']
      ]);
    });
  });

  describe('someCtrl myModule --template=debug', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/controller'))
        .withArguments('someCtrl myModule')
        .withOptions({ template: 'debug' })
        .on('end', done);
    });

    it('file, controller signature, debug logic & placeholders', function () {
      var filePath = 'app/my-module/controllers/some-ctrl.js';
      assert.fileContent([
        [filePath, '$log, MyModule, MyModuleConfig'],
        [filePath, 'this.someData = MyModule.'],
        [filePath, 'this.ENV = MyModuleConfig.ENV'],
        [filePath, 'this.BUILD = MyModuleConfig.BUILD'],
        [filePath, 'this.grade = ']
      ]);
    });

    it('spec file, debug content', function () {
      var filePath = 'test/karma/my-module/some-ctrl.spec.js';
      assert.fileContent([
        [filePath, 'describe(\'.grade()']
      ]);
    });
  });
});
