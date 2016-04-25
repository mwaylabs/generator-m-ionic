'use strict';
var yeoman = require('yeoman-generator');
var fs = require('fs');
var utils = require('../../utils/utils.js');

module.exports = yeoman.Base.extend({

  /**
   * prompts the user for a path to the modelFile (with proper validation)
   * saves modelJSON to this.model on success
   */
  prompting: function () {
    var done = this.async();

    var prompts = [{
      type: 'input',
      name: 'modelPath',
      message: '\nEnter the file path to the JSON file, containing the model definition \nRelative to project root => e.g. app/main/assets/Contact.json\n',
      validate: function (input) {
        var model; // fill with json from file or object from input

        // input is string? => excpect path
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
      }.bind(this)
    }, {
      type: 'input',
      name: 'moduleName',
      message: '\nEnter the module to generate your files into \nRecommended - leave empty for main.\n'
    }];
    this.prompt(prompts, function (props) {
      this.props = props;
      done();
    }.bind(this));
  },

  writing: function () {
    // for testing, when model is directly given as json
    if (!this.model) {
      this.model = this.props.modelPath;
    }

    this.moduleName = utils.checkModule(this.props.moduleName);
    this.moduleFolder = utils.moduleFolder(this.moduleName);
    this.template('_apiomat.html', 'app/' + this.moduleFolder + '/templates/apiomat.html');
    this.template('_apiomat-ctrl.js', 'app/' + this.moduleFolder + '/controllers/apiomat-ctrl.js');
    this.template('_apiomat-ctrl.spec.js', 'test/karma/' + this.moduleFolder + '/apiomat-ctrl.spec.js');
  }
});
