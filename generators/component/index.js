'use strict';
const Generator = require('yeoman-generator');
const utils = require('../../utils/utils.js');
const strings = require('../../utils/strings.js');
const path = require('path');
const chalk = require('chalk');

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

    // component file with snake-case file name
    let modulePath = `${moduleFolder}/components/${folderName}`;
    // modulePath - needed for componentTemplateUrl
    let folderPath = `app/${modulePath}`;

    let templateVars = {
      moduleName: moduleName,
      componentName: componentName,
      componentTagName: componentTagName,
      componentTemplateUrl: `${modulePath}/${fileName}.html`
    };

    // controller
    let filePathJs = `${folderPath}/${fileName}.js`;
    this.fs.copyTpl(
      this.templatePath('_component.js'),
      this.destinationPath(filePathJs),
      templateVars
    );
    // template
    let filePathHtml = `${folderPath}/${fileName}.html`;
    this.fs.copyTpl(
      this.templatePath('_component.html'),
      this.destinationPath(filePathHtml),
      templateVars
    );
    // scss
    let filePathScss = `${folderPath}/_${fileName}.scss`;
    this.fs.copyTpl(
      this.templatePath('_component.scss'),
      this.destinationPath(filePathScss),
      templateVars
    );
    // test
    let filePathTest = `test/karma/${moduleFolder}/${fileName}.spec.js`;
    this.fs.copyTpl(
      this.templatePath('_component.spec.js'),
      this.destinationPath(filePathTest),
      templateVars
    );

    // update the module's .scss with the component's import
    let filePathScssFromMain = `../components/${fileName}.scss`;
    let filePathModuleScss = path.resolve(`./app/${moduleFolder}/styles/${moduleFolder}.scss`);
    try {
      let scssContents = this.fs.read(filePathModuleScss);
      this.fs.write(
        filePathModuleScss,
        `${scssContents}\n// added via yo m-ionic:component subgenerator\n@import '${filePathScssFromMain}'`
      );
    }
    catch (e) {
      console.log(chalk.red('not found ') + `${moduleFolder}.scss\n   please import _${fileName}.scss manually\n`);
    }
  }
});
