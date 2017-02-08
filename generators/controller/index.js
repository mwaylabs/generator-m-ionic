'use strict';
var Generator = require('yeoman-generator');
var utils = require('../../utils/utils.js');

module.exports = Generator.extend({

  initializing: function () {
    // arguments
    this.argument('name', {
      required: true,
      type: String,
      desc: 'The subgenerator name'
    });
    this.argument('module', { type: String, required: false });

    var moduleName = utils.checkModule(this.options.module);
    var serviceName = utils.serviceName(moduleName);
    var configName = utils.configName(moduleName);
    var moduleFolder = utils.moduleFolder(moduleName);

    var controllerName = utils.controllerName(this.options.name);
    var fileName = utils.fileName(controllerName);

    this.templateVars = {
      options: this.options,
      moduleName: moduleName,
      serviceName: serviceName,
      configName: configName,
      moduleFolder: moduleFolder,
      controllerName: controllerName,
      fileName: fileName
    };
  },

  writing: function () {
    // create controller with snake-case file name
    var folder = 'app/' + this.templateVars.moduleFolder + '/controllers/';
    this.fs.copyTpl(
      this.templatePath('_controller.js'),
      this.destinationPath(folder + this.templateVars.fileName + '.js'),
      this.templateVars
    );
    // create karma test file
    var testFolder = 'test/karma/' + this.templateVars.moduleFolder + '/';
    this.fs.copyTpl(
      this.templatePath('_controller.spec.js'),
      this.destinationPath(testFolder + this.templateVars.fileName + '.spec.js'),
      this.templateVars
    );
  }
});
