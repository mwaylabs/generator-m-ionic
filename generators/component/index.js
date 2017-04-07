'use strict';
var Generator = require('yeoman-generator');
var utils = require('../../utils/utils.js');
var strings = require('../../utils/strings.js');

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
    // e.g. main
    let moduleName = utils.checkModule(this.options.module);
    let moduleFolder = utils.moduleFolder(moduleName);

    // e.g myPane
    let componentName = this.options.name;
    // e.g my-pane
    let componentTagName = strings.camelToSnake(componentName);
    let fileName = utils.fileName(componentName) + '-component';
    let folderName = utils.fileName(componentName);

    // create component file with snake-case file name
    let modulePath = `${moduleFolder}/components/${folderName}`;
    // modulePath - needed for componentTemplateUrl
    let folderPath = `app/${modulePath}`;
    let filePathJs = `${folderPath}/${fileName}.js`;
    let filePathHtml = `${folderPath}/${fileName}.html`;
    let filePathScss = `${folderPath}/_${fileName}.scss`;
    let filePathScssFromMain = `../components/${fileName}.scss`;
    let filePathTest = `test/karma/${moduleFolder}/${fileName}.spec.js`;

    let templateVars = {
      moduleName: moduleName,
      componentName: componentName,
      componentTagName: componentTagName,
      componentTemplateUrl: `${modulePath}/${fileName}.html`,
      filePathScssFromMain: filePathScssFromMain,
    };

    // controller
    this.fs.copyTpl(
      this.templatePath('_component.js'),
      this.destinationPath(filePathJs),
      templateVars
    );
    // template
    this.fs.copyTpl(
      this.templatePath('_component.html'),
      this.destinationPath(filePathHtml),
      templateVars
    );
    // scss
    this.fs.copyTpl(
      this.templatePath('_component.scss'),
      this.destinationPath(filePathScss),
      templateVars
    );
    // test
    this.fs.copyTpl(
      this.templatePath('_component.spec.js'),
      this.destinationPath(filePathTest),
      templateVars
    );
  }
});
