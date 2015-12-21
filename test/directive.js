'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var config = require(path.join(__dirname, '../utils/config.js'));

describe('m-ionic:directive', function () {
  describe('some', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/directive'))
        .withArguments('some')
        .on('end', done);
    });

    it('file, content', function () {
      var filePath = 'app/' + config.DEFAULT_MODULE + '/directives/some-dir.js';
      assert.fileContent([
        [filePath, 'angular.module(\'' + config.DEFAULT_MODULE + '\')'],
        [filePath, 'directive(\'some\','],
        [filePath, 'this is the some directive']
      ]);
    });

    it('spec file, describe signature, critical content', function () {
      var specPath = 'test/karma/' + config.DEFAULT_MODULE + '/some-dir.spec.js';
      assert.fileContent([
        [specPath, 'module: main, directive: some'],
        [specPath, '<some></some>'],
        [specPath, 'this is the some directive']
      ]);
    });
  });

  describe('someThing myModule', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/directive'))
        .withArguments('someThing myModule')
        .on('end', done);
    });

    it('file, content', function () {
      var filePath = 'app/my-module/directives/some-thing-dir.js';
      assert.fileContent([
        [filePath, 'angular.module(\'myModule\')'],
        [filePath, 'directive(\'someThing\','],
        [filePath, 'this is the someThing directive']
      ]);
    });

    it('spec file, describe signature, critical content', function () {
      var specPath = 'test/karma/my-module/some-thing-dir.spec.js';
      assert.fileContent([
        [specPath, 'module: myModule, directive: someThing'],
        [specPath, '<some-thing></some-thing>'],
        [specPath, 'this is the someThing directive']
      ]);
    });
  });
});
