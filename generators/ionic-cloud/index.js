'use strict';
var Generator = require('yeoman-generator');
var utils = require('../../utils/utils.js');

module.exports = Generator.extend({

  initializing: function () {
    this.argument('module', { type: String, required: false });
  },

  writing: function () {

    var moduleName = utils.checkModule(this.options.module);
    var moduleFolder = utils.moduleFolder( moduleName);

    this.fs.copy(
      this.templatePath('ionic.config.json'),
      this.destinationPath('ionic.config.json')
    );
    this.fs.copy(
      this.templatePath('user.html'),
      this.destinationPath('app/' + moduleFolder + '/templates/user.html')
    );
    this.fs.copy(
      this.templatePath('user-ctrl.js'),
      this.destinationPath('app/' + moduleFolder + '/controllers/user-ctrl.js')
    );
    this.fs.copy(
      this.templatePath('user-ctrl.spec.js'),
      this.destinationPath('test/karma/' + moduleFolder + '/user-ctrl.spec.js')
    );
  }
});
