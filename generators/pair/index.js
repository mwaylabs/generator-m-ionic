'use strict';
var yeoman = require('yeoman-generator');
var utils = require('../../utils/utils.js');

module.exports = yeoman.Base.extend({

  initializing: function () {
    this.log('You called the m-ionic:pair subgenerator.');

    // arguments
    this.argument('name', {
      required: true,
      type: String,
      desc: 'The subgenerator name'
    });
    this.argument('module', { type: String, required: false });

    this.moduleName = utils.checkModule(this.module);
  },

  writing: function () {
    this.composeWith('m-ionic:controller', {
      arguments: this.name + ' ' + this.moduleName,
    });
    this.composeWith('m-ionic:template', {
      arguments: this.name + ' ' + this.moduleName,
    });
  }
});
