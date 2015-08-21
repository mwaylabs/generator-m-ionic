'use strict';
var yeoman = require('yeoman-generator');
var utils = require('../utils/utils.js');

module.exports = yeoman.generators.NamedBase.extend({
  initializing: function () {
    this.argument('module', { type: String, required: false });
    this.moduleName =  utils.checkModule(this.module);
    this.moduleFolder = utils.moduleFolder(this.moduleName);

    this.log('You called the m:filter subgenerator.');

    this.filterName = this.name;
    this.fileName = utils.fileName(this.filterName);
  },

  writing: function () {
    // create filter with snake-case file name
    var folder = 'app/' + this.moduleFolder + '/filters/';
    this.template('_filter.js', folder + this.fileName + '-fil.js');
    // create karma test file
    var testFolder = 'test/karma/' + this.moduleFolder + '/';
    this.template('_filter.spec.js', testFolder + this.fileName + '-fil.spec.js');
  }
});
