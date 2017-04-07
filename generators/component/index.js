'use strict';
var Generator = require('yeoman-generator');
var utils = require('../../utils/utils.js');

module.exports = Generator.extend({

  initializing: function () {
    this.argument('name', {
      required: true,
      type: String,
      desc: 'The component name'
    });
    this.argument('module', {
      required: false,
      type: String,
      desc: 'Module to generate component into'
    });
  },

  writing: function () {
    let moduleName = utils.checkModule(this.options.module);
    let moduleFolder = utils.moduleFolder(moduleName);

    let componentName = this.options.name;
    let fileName = utils.fileName(componentName) + '-component';

    // create component file with snake-case file name
    let modulePath = `${moduleFolder}/components/${componentName}`;
    // modulePath - needed for componentTemplateUrl
    let folder = `app/${modulePath}`;
    let filePathJs = `${folder}/${fileName}.js`;
    let filePathHtml = `${folder}/${fileName}.html`;
    let filePathScss = `${folder}/_${fileName}.scss`;
    let filePathScssFromMain = `../components/${fileName}.scss`;

    let templateVars = {
      moduleName: moduleName,
      componentName: componentName,
      componentTemplateUrl: `${modulePath}/${fileName}.html`,
      filePathScssFromMain: filePathScssFromMain,
    };

    console.log(filePathJs);
    this.fs.copyTpl(
      this.templatePath('_component.js'),
      this.destinationPath(filePathJs),
      templateVars
    );
    this.fs.copyTpl(
      this.templatePath('_component.html'),
      this.destinationPath(filePathHtml),
      templateVars
    );
    this.fs.copyTpl(
      this.templatePath('_component.scss'),
      this.destinationPath(filePathScss),
      templateVars
    );
  }
});
