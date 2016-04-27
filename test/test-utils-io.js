'use strict';

var assert = require('yeoman-assert');
var fs = require('fs');
var io = require('../utils/io.js');

describe('utils/io', function () {

  describe('.validateModelDefinition()', function () {

    var yeomanMock;
    var validateModelDefinition;
    var modelDefinition;
    beforeEach(function () {
      yeomanMock = {
        destinationPath: function (input) {
          return input;
        },
        fs: {
          read: function (filePath) {
            return fs.readFileSync(filePath);
          }
        }
      };
      validateModelDefinition = io.validateModelDefinition.bind(yeomanMock);
      // copy modelDefinition every time
      modelDefinition = JSON.parse(JSON.stringify(require('../generators/apiomat/Contact.json')));
    });

    it('reads from file and passes all checks', function () {
      var modelPath = process.cwd() + '/Contact.json';
      // write file to test folder
      fs.writeFileSync(modelPath, JSON.stringify(modelDefinition));
      // read from file
      var result = validateModelDefinition(modelPath);
      // is result in yeomanMock.model the same as we saved to file?
      assert.textEqual(JSON.stringify(yeomanMock.model), JSON.stringify(modelDefinition));
      // returns true
      assert.equal(result, true);
    });

    it('pass in modelDefinition as argument and pass all checks', function () {
      // pass in modelDefinition as argument
      var result = validateModelDefinition(modelDefinition);
      // is result in yeomanMock.model the same as we saved to file?
      assert.textEqual(JSON.stringify(yeomanMock.model), JSON.stringify(modelDefinition));
      // returns true
      assert.equal(result, true);
    });

    it('Doesn\'t seem to exist', function () {
      var modelPath = process.cwd() + '/noexist';
      // read from file
      var result = validateModelDefinition(modelPath);
      // returns proper error message
      assert(result.indexOf('Doesn\'t seem to exist') === 0);
    });

    it('Is not a file', function () {
      var modelPath = process.cwd() + '/noexist';
      fs.mkdirSync(modelPath);
      // read from file
      var result = validateModelDefinition(modelPath);
      // returns proper error message
      assert(result.indexOf('Is not a file') === 0);
    });

    it('Not a valid JSON file', function () {
      var modelPath = process.cwd() + '/Contact.json';
      // write file to test folder
      fs.writeFileSync(modelPath, JSON.stringify(modelDefinition) + '+');
      // read from file
      var result = validateModelDefinition(modelPath);
      // returns proper error message
      assert(result.indexOf('Not a valid JSON file') === 0);
    });

    it('"name" field not a string', function () {
      // manipulate json
      delete modelDefinition.name;
      // pass in modelDefinition as argument
      var result = validateModelDefinition(modelDefinition);
      // returns proper error message
      assert(result.indexOf('"name" field not a string') === 0);
    });

    it('"label" field not a string', function () {
      // manipulate json
      delete modelDefinition.label;
      // pass in modelDefinition as argument
      var result = validateModelDefinition(modelDefinition);
      // returns proper error message
      assert(result.indexOf('"label" field not a string') === 0);
    });

    it('"description" field not a string', function () {
      // manipulate json
      delete modelDefinition.description;
      // pass in modelDefinition as argument
      var result = validateModelDefinition(modelDefinition);
      // returns proper error message
      assert(result.indexOf('"description" field not a string') === 0);
    });

    it('"attributes" field not an array', function () {
      // manipulate json
      delete modelDefinition.attributes;
      // pass in modelDefinition as argument
      var result = validateModelDefinition(modelDefinition);
      // returns proper error message
      assert(result.indexOf('"attributes" field not an array') === 0);
    });

    it('"name" field of attributes[0] not a string', function () {
      // manipulate json
      delete modelDefinition.attributes[0].name;
      // pass in modelDefinition as argument
      var result = validateModelDefinition(modelDefinition);
      // returns proper error message
      assert(result.indexOf('"name" field of attributes[0] not a string') === 0);
    });

    it('"label" field of attributes[0] not a string', function () {
      // manipulate json
      delete modelDefinition.attributes[0].label;
      // pass in modelDefinition as argument
      var result = validateModelDefinition(modelDefinition);
      // returns proper error message
      assert(result.indexOf('"label" field of attributes[0] not a string') === 0);
    });

    it('"type" field of attributes[0] not a string', function () {
      // manipulate json
      delete modelDefinition.attributes[0].type;
      // pass in modelDefinition as argument
      var result = validateModelDefinition(modelDefinition);
      // returns proper error message
      assert(result.indexOf('"type" field of attributes[0] not a string') === 0);
    });

    it('"type" field of attributes[0] not supported', function () {
      // manipulate json
      modelDefinition.attributes[0].type = 'what';
      // pass in modelDefinition as argument
      var result = validateModelDefinition(modelDefinition);
      // returns proper error message
      assert(result.indexOf('"type" field of attributes[0] not supported') === 0);
    });
  });
});
