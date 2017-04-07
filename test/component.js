'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-m-ionic:component', function () {
  describe('mini', function () {
    before(function () {
      return helpers.run(path.join(__dirname, '../generators/component'))
        .withArguments('mini')
        .toPromise();
    });

    it('creates files', function () {
      assert.file([
        'app/main/components/mini/mini-component.js',
        'app/main/components/mini/mini-component.html',
        'app/main/components/mini/_mini-component.scss'
      ]);
    });
  });
  describe('miniCounter', function () {
    before(function () {
      return helpers.run(path.join(__dirname, '../generators/component'))
        .withArguments('miniCounter')
        .toPromise();
    });

    it('creates files', function () {
      assert.file([
        'app/main/components/mini-counter/mini-counter-component.js',
        'app/main/components/mini-counter/mini-counter-component.html',
        'app/main/components/mini-counter/_mini-counter-component.scss'
      ]);
    });
  });
});
