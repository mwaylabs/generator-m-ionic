/*global describe, it*/
'use strict';

var assert = require('yeoman-generator').assert;
var utils = require('../utils/utils.js');
var config = require('../utils/config.js');

describe('utils', function () {

  it('decapitalize', function () {
    assert.textEqual(utils.decapitalize('Asdf'), 'asdf');
    assert.textEqual(utils.decapitalize('asdf'), 'asdf');
    assert.textEqual(utils.decapitalize('MyNewApp'), 'myNewApp');
  });

  it('textToCamel', function () {
    assert.textEqual(utils.textToCamel('myNewApp'), 'myNewApp');
    assert.textEqual(utils.textToCamel('My new app'), 'myNewApp');
    assert.textEqual(utils.textToCamel('My New app'), 'myNewApp');
    assert.textEqual(utils.textToCamel('My NEW aPP'), 'myNewApp');
    assert.textEqual(utils.textToCamel('My-NEW aPP'), 'myNewApp');
    assert.textEqual(utils.textToCamel('My NEW-aPP'), 'myNewApp');
    assert.textEqual(utils.textToCamel('My-NEW-aPP'), 'myNewApp');
    assert.textEqual(utils.textToCamel('M1y-N2EW-a3PP'), 'm1yN2ewA3pp');
    assert.textEqual(utils.textToCamel('M1y-N2EW-3PP'), 'm1yN2ew3pp');
  });

  it('camelToSnake', function () {
    assert.textEqual(utils.camelToSnake('oneTwoThree'), 'one-two-three');
    assert.textEqual(utils.camelToSnake('OneTwoThree'), 'one-two-three');
  });

  it('checkModule', function () {
    assert.textEqual(utils.checkModule(''), config.DEFAULT_MODULE);
    assert.textEqual(utils.checkModule(undefined), config.DEFAULT_MODULE);
    assert.textEqual(utils.checkModule('myModule'), 'myModule');
  });
});
