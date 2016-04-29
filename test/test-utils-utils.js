'use strict';

var assert = require('yeoman-assert');
var utils = require('../utils/utils.js');
var config = require('../utils/config.js');

describe('utils/utils', function () {
  console.log(process.cwd());
  it('.validateAppName()', function () {
    assert.textEqual(utils.validateAppName(''), 'Please enter a name');
    assert(utils.validateAppName('asf'));
  });

  it('.validateAppId()', function () {
    assert(typeof utils.validateAppId('') === 'string');
    assert(typeof utils.validateAppId('asdfaasdf') === 'string');
    assert(utils.validateAppId('asdfaasdf.dfdf'));
    assert(utils.validateAppId('asdfaasdf.dfdf.aaf'));
  });

  it('.checkModule()', function () {
    assert.textEqual(utils.checkModule(''), config.DEFAULT_MODULE);
    assert.textEqual(utils.checkModule(undefined), config.DEFAULT_MODULE);
    assert.textEqual(utils.checkModule('myModule'), 'myModule');
  });

  it('.moduleName()', function () {
    assert.textEqual(utils.moduleName('myModule'), 'myModule');
    assert.textEqual(utils.moduleName(' a f dd'), 'aFDd');
    assert.textEqual(utils.moduleName('This is my New App P24'), 'thisIsMyNewAppP24');
    assert.textEqual(utils.moduleName('Yea -24 !bC$f'), 'yea24BcF');
  });

  it('.moduleFolder()', function () {
    assert.textEqual(utils.moduleFolder('thisIsMyApp'), 'this-is-my-app');
    assert.textEqual(utils.moduleFolder('another2App24'), 'another2-app24');
  });

  it('.appBowerName()', function () {
    assert.textEqual(utils.appBowerName(' Some Name'), 'some-name');
    assert.textEqual(utils.appBowerName('Yo9 There'), 'yo9-there');
  });

  it('.configName()', function () {
    assert.textEqual(utils.configName(), 'Config');
    assert.textEqual(utils.configName('myModule'), 'MyModuleConfig');
    assert.textEqual(utils.configName(config.DEFAULT_MODULE), 'Config');
  });

  it('.controllerName()', function () {
    assert.textEqual(utils.controllerName('lower'), 'LowerCtrl');
    assert.textEqual(utils.controllerName('Upper'), 'UpperCtrl');
    assert.textEqual(utils.controllerName('lowerCamel'), 'LowerCamelCtrl');
    assert.textEqual(utils.controllerName('UpperCamel'), 'UpperCamelCtrl');
    assert.textEqual(utils.controllerName('lowerCamelCtrl'), 'LowerCamelCtrl');
    assert.textEqual(utils.controllerName('UpperCamelCtrl'), 'UpperCamelCtrl');
    assert.textEqual(utils.controllerName('lowerCamelController'), 'LowerCamelCtrl');
    assert.textEqual(utils.controllerName('UpperCamelController'), 'UpperCamelCtrl');
  });

  it('.serviceName()', function () {
    assert.textEqual(utils.serviceName('my'), 'My');
    assert.textEqual(utils.serviceName('myService'), 'MyService');
    assert.textEqual(utils.serviceName('MyService'), 'MyService');
  });

  it('.directiveTagName()', function () {
    assert.textEqual(utils.directiveTagName('my'), 'my');
    assert.textEqual(utils.directiveTagName('dirName'), 'dir-name');
    assert.textEqual(utils.directiveTagName('AnotherDir'), 'another-dir');
  });

  it('.fileName()', function () {
    assert.textEqual(utils.fileName('lower'), 'lower');
    assert.textEqual(utils.fileName('Upper'), 'upper');
    assert.textEqual(utils.fileName('thisMyFilename'), 'this-my-filename');
    assert.textEqual(utils.fileName('someAp3pName234'), 'some-ap3p-name234');
  });

  it('.barColor()', function () {
    var TEST_COUNT = 10000;
    var MAX_DEVIATION_FACTOR = 0.5;
    var results = {};
    // generate 10000 results
    for (var i = 0; i < TEST_COUNT; i++) {
      var randomColor = utils.barColor();
      if (!results[randomColor]) {
        results[randomColor] = 1;
      }
      else {
        results[randomColor]++;
      }
    }
    // check that the rolls are not less than half of what we expect
    var minimalCount = TEST_COUNT / config.IONIC_COLORS.length * MAX_DEVIATION_FACTOR;
    for (var j = 0, color; ((color = config.IONIC_COLORS[j])); j++) {
      assert(results[color] > minimalCount);
    }
  });
});
