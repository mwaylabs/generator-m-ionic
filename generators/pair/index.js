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

    this.moduleName = utils.checkModule(this.options.module);
  },

  writing: function () {
    this.composeWith('m-ionic:controller', {
      arguments: this.options.name + ' ' + this.moduleName,
    });
    this.composeWith('m-ionic:template', {
      arguments: this.options.name + ' ' + this.moduleName,
    });
  }
});
