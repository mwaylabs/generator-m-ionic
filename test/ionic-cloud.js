'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-m-ionic:ionic-cloud', function () {

  describe('main module', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/ionic-cloud'))
        .on('end', done);
    });

    it('creates proper files', function () {
      assert.file([
        'ionic.config.json',
        'app/main/templates/user.html',
        'app/main/controllers/user-ctrl.js',
        'test/karma/main/user-ctrl.spec.js'
      ]);
    });
  });

  describe('custom module', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/ionic-cloud'))
        .withArguments('ionic')
        .on('end', done);
    });

    it('creates proper files', function () {
      assert.file([
        'ionic.config.json',
        'app/ionic/templates/user.html',
        'app/ionic/controllers/user-ctrl.js',
        'test/karma/ionic/user-ctrl.spec.js'
      ]);
    });
  });

});
