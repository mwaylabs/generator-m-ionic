/*global describe, it, before*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var config = require(path.join(__dirname, '../utils/config.js'));

describe('m:filter', function () {
  describe('m:filter some', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../filter'))
        .withArguments('some')
        .on('end', done);
    });

    it('filter file contents', function () {
      var filePath = 'app/' + config.DEFAULT_MODULE + '/filters/some-fil.js';
      assert.fileContent([
        [filePath, 'angular.module(\'' + config.DEFAULT_MODULE + '\')'],
        [filePath, 'filter(\'some\',']
      ]);
    });
  });

  describe('m:filter someThing myModule', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../filter'))
        .withArguments('someThing myModule')
        .on('end', done);
    });

    it('filter file contents', function () {
      var filePath = 'app/my-module/filters/some-thing-fil.js';
      assert.fileContent([
        [filePath, 'angular.module(\'myModule\')'],
        [filePath, 'filter(\'someThing\',']
      ]);
    });
  });
});
