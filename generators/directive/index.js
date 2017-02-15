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

    var directiveName = this.options.name;
    var directiveTagName = utils.directiveTagName(directiveName);
    var fileName = utils.fileName(directiveName);

    var templateVars = {
      moduleName: moduleName,
      moduleFolder: moduleFolder,
      directiveName: directiveName,
      directiveTagName: directiveTagName,
      fileName: fileName
    };

    // create directive with snake-case file name
    var folder = 'app/' + moduleFolder + '/directives/';
    this.fs.copyTpl(
      this.templatePath('_directive.js'),
      this.destinationPath(folder + fileName + '-dir.js'),
      templateVars
    );
    // create karma test file
    var testFolder = 'test/karma/' + moduleFolder + '/';
    this.fs.copyTpl(
      this.templatePath('_directive.spec.js'),
      this.destinationPath(testFolder + fileName + '-dir.spec.js'),
      templateVars
    );
  }
});
