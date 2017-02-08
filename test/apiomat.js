'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

var modelDefinition = require('../generators/apiomat/Contact.json');
// TODO: test reading from file!

describe('generators/apiomat', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/apiomat'))
      .withPrompts({
        modelPath: modelDefinition, // shortcut, directly fill with json
        moduleName: 'main'
      })
      .on('end', function () {
        done();
        // console.log(process.cwd(), __dirname);
      });
  });

  it('creates files', function () {
    assert.file([
      'app/main/templates/apiomat.html',
      'app/main/controllers/apiomat-ctrl.js',
      'test/karma/main/apiomat-ctrl.spec.js'
    ]);
  });
});
