'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('M-ionic:generators/pair', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/pair'))
      .withGenerators([ // configure path to subgenerators
        path.join(__dirname, '../generators/controller'),
        path.join(__dirname, '../generators/template'),
      ])
      .withArguments('name')
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'app/main/controllers/name-ctrl.js',
      'test/karma/main/name-ctrl.spec.js',
      'app/main/templates/name.html'
    ]);
  });
});
