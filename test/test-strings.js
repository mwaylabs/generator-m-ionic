/*global describe, it*/
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
    assert.textEqual(strings.textToCamel('My NEW aPP'), 'myNEWAPP');
    // dashes and spaces
    assert.textEqual(strings.textToCamel('My-NEW aPP'), 'myNEWAPP');
    assert.textEqual(strings.textToCamel('My NEW-aPP'), 'myNEWAPP');
    assert.textEqual(strings.textToCamel('My-NEW-aPP'), 'myNEWAPP');
    // dashes, spaces and numbers
    assert.textEqual(strings.textToCamel('M1y N2EW-a3PP'), 'm1yN2EWA3PP');
    assert.textEqual(strings.textToCamel('M1y-N2EW 3PP'), 'm1yN2EW3PP');
  });

  it('.camelToSnake()', function () {
    assert.textEqual(strings.camelToSnake('oneTwoThree'), 'one-two-three');
    assert.textEqual(strings.camelToSnake('OneTwoThree'), 'one-two-three');
    // with dot
    assert.textEqual(strings.camelToSnake('OneTwoThree.main'), 'one-two-three.main');
    assert.textEqual(strings.camelToSnake('OneTwoThree.mainStuff'), 'one-two-three.main-stuff');
  });
});
