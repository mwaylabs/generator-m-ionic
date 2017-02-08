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

    var moduleName =  utils.checkModule(this.options.module);
    var moduleFolder = utils.moduleFolder(moduleName);

    var serviceName = utils.serviceName(this.options.name);
    var fileName = utils.fileName(serviceName);

    this.templateVars = {
      options: this.options,
      moduleName: moduleName,
      moduleFolder: moduleFolder,
      serviceName: serviceName,
      fileName: fileName
    };
  },

  writing: function () {
    // create service with snake-case file name
    var folder = 'app/' + this.templateVars.moduleFolder + '/services/';
    this.fs.copyTpl(
      this.templatePath('_service.js'),
      this.destinationPath(folder + this.templateVars.fileName + '-serv.js'),
      this.templateVars
    );
    // create karma test file
    var testFolder = 'test/karma/' + this.templateVars.moduleFolder + '/';
    this.fs.copyTpl(
      this.templatePath('_service.spec.js'),
      this.destinationPath(testFolder + this.templateVars.fileName + '-serv.spec.js'),
      this.templateVars
    );
  }
});
