/*global describe, before, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var config = require(path.join(__dirname, '../utils/config.js'));

describe('m:service', function () {

  describe('m:service some', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../service'))
        .withArguments('some')
        .on('end', done);
    });

    it('service file contents', function () {
      var filePath = 'app/' + config.DEFAULT_MODULE + '/services/some-serv.js';
      assert.fileContent([
        [filePath, 'angular.module(\'' + config.DEFAULT_MODULE + '\')'],
        [filePath, 'service(\'Some\',']
      ]);
    });
  });

  describe('m:service some myModule', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../service'))
        .withArguments('some myModule')
        .on('end', done);
    });

    it('service file contents', function () {
      var filePath = 'app/my-module/services/some-serv.js';
      assert.fileContent([
        [filePath, 'angular.module(\'myModule\')'],
        [filePath, 'service(\'Some\',']
      ]);
    });
  });
});
