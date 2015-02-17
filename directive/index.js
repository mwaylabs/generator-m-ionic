'use strict';
var yeoman = require('yeoman-generator');
var utils = require('../utils/utils.js');

module.exports = yeoman.generators.NamedBase.extend({
  initializing: function () {
    this.argument('module', { type: String, required: false });
    this.moduleName =  utils.checkModule(this.module);
    this.moduleFolder = utils.moduleFolder(this.moduleName);

    this.log('You called the m:directive subgenerator.');

    this.directiveName = this.name;
    this.fileName = utils.fileName(this.directiveName);
  },

  writing: function () {
    // create directive with snake-case file name
    var folder = 'app/' + this.moduleFolder + '/directives/';
    this.template('_directive.js', folder + this.fileName + '-dir.js');
  }
});
