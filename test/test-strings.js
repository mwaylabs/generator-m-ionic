'use strict';

var assert = require('yeoman-generator').assert;
var strings = require('../utils/strings.js');

describe('strings', function () {

  it('.decapitalize()', function () {
    assert.textEqual(strings.decapitalize('Asdf'), 'asdf');
    assert.textEqual(strings.decapitalize('asdf'), 'asdf');
    assert.textEqual(strings.decapitalize('MyNewApp'), 'myNewApp');
  });

  it('.textToCamel()', function () {
    // leave camel case
    assert.textEqual(strings.textToCamel('myNewApp'), 'myNewApp');
    // spaces and capitalization
    assert.textEqual(strings.textToCamel('My new app'), 'myNewApp');
    assert.textEqual(strings.textToCamel('My New app'), 'myNewApp');
    assert.textEqual(strings.textToCamel('My NEW aPP'), 'myNewApp');
    // dashes and spaces
    assert.textEqual(strings.textToCamel('My-NEW aPP'), 'myNewApp');
    assert.textEqual(strings.textToCamel('My NEW-aPP'), 'myNewApp');
    assert.textEqual(strings.textToCamel('My-NEW-aPP'), 'myNewApp');
    // dashes, spaces and numbers
    assert.textEqual(strings.textToCamel('M1y N2EW-a3PP'), 'm1yN2ewA3pp');
    assert.textEqual(strings.textToCamel('M1y-N2EW 3PP'), 'm1yN2ew3pp');
  });

  it('.camelToSnake()', function () {
    assert.textEqual(strings.camelToSnake('oneTwoThree'), 'one-two-three');
    assert.textEqual(strings.camelToSnake('OneTwoThree'), 'one-two-three');
    // with dot
    assert.textEqual(strings.camelToSnake('OneTwoThree.main'), 'one-two-three.main');
    assert.textEqual(strings.camelToSnake('OneTwoThree.mainStuff'), 'one-two-three.main-stuff');
  });
});
