'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

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
        'app/main/components/mini/_mini-component.scss',
        'test/karma/main/mini-component.spec.js'
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
        'app/main/components/mini-counter/_mini-counter-component.scss',
        'test/karma/main/mini-counter-component.spec.js'
      ]);
    });
  });

  describe('miniCounter module', function () {
    before(function () {
      return helpers.run(path.join(__dirname, '../generators/component'))
        .withArguments('miniCounter module')
        .toPromise();
    });

    it('creates files', function () {
      assert.file([
        'app/module/components/mini-counter/mini-counter-component.js',
        'app/module/components/mini-counter/mini-counter-component.html',
        'app/module/components/mini-counter/_mini-counter-component.scss',
        'test/karma/module/mini-counter-component.spec.js'
      ]);
    });
  });
});
