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
    var barColor = utils.barColor();

    var templateName = this.options.name;
    var fileName = utils.fileName(templateName);

    this.templateVars = {
      moduleName: moduleName,
      moduleFolder: moduleFolder,
      barColor: barColor,
      templateName: templateName,
      fileName: fileName
    };
  },

  writing: function () {
    // create template with snake-case file name
    var folder = 'app/' + this.templateVars.moduleFolder + '/templates/';
    if (!this.options.template) {
      this.fs.copyTpl(
        this.templatePath('_template.html'),
        this.destinationPath(folder + this.templateVars.fileName + '.html'),
        this.templateVars
      );
    }
    else if (this.options.template === 'debug') {
      this.fs.copyTpl(
        this.templatePath('_debug.html'),
        this.destinationPath(folder + this.templateVars.fileName + '.html'),
        this.templateVars
      );
    }
    else if (this.options.template === 'list-detail') {
      this.fs.copy(
        this.templatePath('list-detail.html'),
        this.destinationPath(folder + this.templateVars.fileName + '.html')
      );
    }
    else if (this.options.template === 'list') {
      this.fs.copyTpl(
        this.templatePath('_list.html'),
        this.destinationPath(folder + this.templateVars.fileName + '.html'),
        this.templateVars
      );
    }
    else if (this.options.template === 'menu') {
      this.fs.copyTpl(
        this.templatePath('_menu.html'),
        this.destinationPath(folder + this.templateVars.fileName + '.html'),
        this.templateVars
      );
    }
    else if (this.options.template === 'tabs') {
      this.fs.copyTpl(
        this.templatePath('_tabs.html'),
        this.destinationPath(folder + this.templateVars.fileName + '.html'),
        this.templateVars
      );
    }
  }
});
