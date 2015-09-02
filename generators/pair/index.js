'use strict';
var yeoman = require('yeoman-generator');
var utils = require('../../utils/utils.js');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.argument('name', {
      required: true,
      type: String,
      desc: 'The subgenerator name'
    });
    this.argument('module', { type: String, required: false });
    this.moduleName = utils.checkModule(this.module);

    this.log('You called the m:pair subgenerator with the argument ' + this.name + '.');
  },

  writing: function () {
    this.composeWith('m:controller', {
      arguments: this.name + ' ' + this.moduleName,
    });
    this.composeWith('m:template', {
      arguments: this.name + ' ' + this.moduleName,
    });
  }
});
