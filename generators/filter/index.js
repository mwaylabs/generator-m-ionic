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
  },

  writing: function () {
    var moduleName =  utils.checkModule(this.options.module);
    var moduleFolder = utils.moduleFolder(moduleName);

    var filterName = this.options.name;
    var fileName = utils.fileName(filterName);

    var templateVars = {
      options: this.options,
      moduleName: moduleName,
      moduleFolder: moduleFolder,
      filterName: filterName,
      fileName: fileName
    };

    // create filter with snake-case file name
    var folder = 'app/' + moduleFolder + '/filters/';
    this.fs.copyTpl(
      this.templatePath('_filter.js'),
      this.destinationPath(folder + fileName + '-fil.js'),
      templateVars
    );
    // create karma test file
    var testFolder = 'test/karma/' + moduleFolder + '/';
    this.fs.copyTpl(
      this.templatePath('_filter.spec.js'),
      this.destinationPath(testFolder + fileName + '-fil.spec.js'),
      templateVars
    );
  }
});
