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

    var constantName = this.options.name;
    var fileName = utils.fileName(constantName);

    this.templateVars = {
      options: this.options,
      moduleName: moduleName,
      moduleFolder: moduleFolder,
      constantName: constantName,
      fileName: fileName
    };
  },

  writing: function () {
    // create constant with snake-case file name
    var folder = 'app/' + this.templateVars.moduleFolder + '/constants/';
    this.fs.copyTpl(
      this.templatePath('_constant.js'),
      this.destinationPath(folder + this.templateVars.fileName + '-const.js'),
      this.templateVars
    );
  }
});
