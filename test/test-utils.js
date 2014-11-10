/*global describe, it*/
'use strict';

var assert = require('yeoman-generator').assert;
var utils = require('../utils/utils.js');

describe('utils', function () {

  it('decapitalize', function () {
    assert.textEqual(utils.decapitalize('Asdf'), 'asdf');
    assert.textEqual(utils.decapitalize('asdf'), 'asdf');
  });

  it('modularize', function () {
    assert.textEqual(utils.modularize('My new app'), 'myNewApp');
  });

  it('camelToSnake', function () {
    assert.textEqual(utils.camelToSnake('oneTwoThree'), 'one-two-three');
    assert.textEqual(utils.camelToSnake('OneTwoThree'), 'one-two-three');
  });
});
