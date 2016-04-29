'use strict';
var yeoman = require('yeoman-generator');
var utils = require('../../utils/utils.js');
var io = require('../../utils/io.js');

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
      // validates the file and saves the JSON to this.model
      validate: io.validateModelDefinition.bind(this)
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
