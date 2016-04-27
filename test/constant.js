'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var config = require(path.join(__dirname, '../utils/config.js'));

describe('generators/constant', function () {
  describe('generators/constant some', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/constant'))
        .withArguments('some')
        .on('end', done);
    });

    it('constant file contents', function () {
      var filePath = 'app/' + config.DEFAULT_MODULE + '/constants/some-const.js';
      assert.fileContent([
        [filePath, 'angular.module(\'' + config.DEFAULT_MODULE + '\')'],
        [filePath, 'constant(\'some\','],
        [filePath, 'CONSTANT_1: \'meaningful value\'']
      ]);
    });
  });

  describe('generators/constant someThing myModule', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/constant'))
        .withArguments('someThing myModule')
        .on('end', done);
    });

    it('constant file contents', function () {
      var filePath = 'app/my-module/constants/some-thing-const.js';
      assert.fileContent([
        [filePath, 'angular.module(\'myModule\')'],
        [filePath, 'constant(\'someThing\','],
        [filePath, 'CONSTANT_1: \'meaningful value\'']
      ]);
    });
  });

  describe('generators/constant myConstant --template=config', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/constant'))
        .withArguments('myConstant')
        .withOptions({ template: 'config' })
        .on('end', done);
    });

    it('constant file contents', function () {
      var filePath = 'app/main/constants/my-constant-const.js';
      assert.fileContent(filePath, 'ENV: {');
    });
  });
});
