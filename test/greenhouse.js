'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-m-ionic:greenhouse', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/greenhouse'))
      .withPrompts({someAnswer: true})
      .toPromise();
  });

  it('creates files', function () {
    assert.file([
      'greenhouse.sh'
    ]);
  });
});
