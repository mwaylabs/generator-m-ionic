'use strict';

var fs = require('fs');

module.exports = {

  /**
   * synchronous function to read and validate an apiomat model
   * definition from file or as json
   * saves defintion to this.model
   * this needs to be bound to yeoman-generator like object
   * @param  {String|Object} input Path to JSON file or model defintion as Object
   * @return {String|Boolean}       Error message as string or true
   */
  validateModelDefinition: function (input) {
    var model; // fill with json from file or object from input
    // input is string? => expect path
    if (typeof input === 'string') {
      var filePath = this.destinationPath(input);
      // file exists?
      try {
        var fileStat = fs.statSync(filePath);
      }
      catch (e) {
        return 'Doesn\'t seem to exist: ' + filePath;
      }
      // is file?
      if (!fileStat.isFile()) {
        return 'Is not a file: ' + filePath;
      }
      // contains json?
      var contentString = this.fs.read(filePath);
      try {
        model = JSON.parse(contentString);
      }
      catch (e) {
        return 'Not a valid JSON file: ' + filePath + ' ' + e;
      }
    }
    else {
      model = input;
    }
    // has proper fields?
    if (typeof model.name !== 'string') {
      return '"name" field not a string';
    }
    if (typeof model.label !== 'string') {
      return '"label" field not a string';
    }
    if (typeof model.description !== 'string') {
      return '"description" field not a string';
    }
    if (!Array.isArray(model.attributes)) {
      return '"attributes" field not an array';
    }
    // attributes
    for (var i = 0, item; (item = model.attributes[i]); i++) {
      // mandatory fields present?
      if (typeof item.name !== 'string') {
        return '"name" field of attributes[' + i + '] not a string';
      }
      if (typeof item.label !== 'string') {
        return '"label" field of attributes[' + i + '] not a string';
      }
      if (typeof item.type !== 'string') {
        return '"type" field of attributes[' + i + '] not a string';
      }
      // valid type?
      var type = item.type.toLowerCase();
      if (type !== 'string' && type !== 'number') {
        return '"type" field of attributes[' + i + '] not supported: ' + item.type;
      }
    }
    // save to this.model so it can be read by template engine
    this.model = model;
    return true;
  }

};
