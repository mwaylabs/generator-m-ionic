/*global describe, it, before*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var config = require(path.join(__dirname, '../utils/config.js'));

describe('m:directive', function () {
  describe('m:directive some', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../directive'))
        .withArguments('some')
        .on('end', done);
    });

    it('directive file contents', function () {
      var filePath = 'app/' + config.DEFAULT_MODULE + '/directives/some-dir.js';
      assert.fileContent([
        [filePath, 'angular.module(\'' + config.DEFAULT_MODULE + '\')'],
        [filePath, 'directive(\'some\',']
      ]);
    });
  });

  describe('m:directive someThing myModule', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../directive'))
        .withArguments('someThing myModule')
        .on('end', done);
    });

    it('directive file contents', function () {
      var filePath = 'app/my-module/directives/some-thing-dir.js';
      assert.fileContent([
        [filePath, 'angular.module(\'myModule\')'],
        [filePath, 'directive(\'someThing\',']
      ]);
    });
  });
});
