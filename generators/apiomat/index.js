'use strict';
var Generator = require('yeoman-generator');
var utils = require('../../utils/utils.js');
var io = require('../../utils/io.js');

module.exports = Generator.extend({

  /**
   * prompts the user for a path to the modelFile (with proper validation)
   * saves modelJSON to this.model on success
   */
  prompting: function () {
    var prompts = [{
      type: 'input',
      name: 'modelPath',
      message: '\nEnter the file path to the JSON file, containing the model definition \nRelative to project root => e.g. app/main/assets/Contact.json\n',
      // validates the file and saves the JSON
      // to this.model
      validate: io.validateModelDefinition.bind(this)
    }, {
      type: 'input',
      name: 'moduleName',
      message: '\nEnter the module to generate your files into \nRecommended - leave empty for main.\n'
    }];

    return this.prompt(prompts)
    .then(function (props) {
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    var templateVars = {};
    if (!this.model) {
      templateVars.model = this.props.modelPath;
    }
    // for testing, model is given directly as JSON
    // in this.model through io.validateModelDefinition
    else {
      templateVars.model = this.model;
    }

    var moduleName = templateVars.moduleName = utils.checkModule(this.props.moduleName);
    var moduleFolder = utils.moduleFolder(moduleName);

    this.fs.copyTpl(
      this.templatePath('_apiomat.html'),
      this.destinationPath('app/' + moduleFolder + '/templates/apiomat.html'),
      templateVars
    );
    this.fs.copyTpl(
      this.templatePath('_apiomat-ctrl.js'),
      this.destinationPath('app/' + moduleFolder + '/controllers/apiomat-ctrl.js'),
      templateVars
    );
    this.fs.copyTpl(
      this.templatePath('_apiomat-ctrl.spec.js'),
      this.destinationPath('test/karma/' + moduleFolder + '/apiomat-ctrl.spec.js'),
      templateVars
    );
  }
});
