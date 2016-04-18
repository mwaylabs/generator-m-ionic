'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-m-ionic:ionic-platform', function () {

  describe('main module', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/ionic-platform'))
        .on('end', done);
    });

    it('creates proper files', function () {
      assert.file([
        'gulp/ionic.js',
        'app/main/templates/user.html',
        'app/main/controllers/user-ctrl.js',
        'test/karma/main/user-ctrl.spec.js'
      ]);
      assert.fileContent('app/main/controllers/user-ctrl.js', 'Ionic.Auth');
    });
  });

  describe('custom module', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/ionic-platform'))
        .withArguments('ionic')
        .on('end', done);
    });

    it('creates proper files', function () {
      assert.file([
        'gulp/ionic.js',
        'app/ionic/templates/user.html',
        'app/ionic/controllers/user-ctrl.js',
        'test/karma/ionic/user-ctrl.spec.js'
      ]);
      assert.fileContent('app/ionic/controllers/user-ctrl.js', 'Ionic.Auth');
    });
  });

});
