/*global describe, before, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var config = require(path.join(__dirname, '../utils/config.js'));

describe('m:template', function () {

  describe('m:template some-template', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../template'))
        .withArguments('some-template')
        .on('end', done);
    });

    it('template file contents', function () {
      var filePath = 'app/' + config.DEFAULT_MODULE + '/templates/some-template.html';
      assert.fileContent([
        [filePath, '<ion-view view-title="' + config.DEFAULT_MODULE + ' module">'],
        [filePath, 'This is your some-template template!']
      ]);
    });
  });

  describe('m:template someTemplate myModule', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../template'))
        .withArguments('someTemplate myModule')
        .on('end', done);
    });

    it('template file contents', function () {
      var filePath = 'app/my-module/templates/some-template.html';
      assert.fileContent([
        [filePath, '<ion-view view-title="myModule module">'],
        [filePath, 'This is your someTemplate template!']
      ]);
    });
  });

  describe('m:template someTemplate --sample=start', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../template'))
        .withArguments('someTemplate')
        .withOptions({ sample: 'start' })
        .on('end', done);
    });

    it('template file contents', function () {
      var filePath = 'app/main/templates/some-template.html';
      assert.fileContent([
        [filePath, '<ion-item>{{start.someData.binding}}']
      ]);
    });
  });
});
