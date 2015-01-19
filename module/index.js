'use strict';
var utils = require('../utils/utils.js');
var yeoman = require('yeoman-generator');

var MGenerator = yeoman.generators.NamedBase.extend({
  initializing: function () {
    this.log('You called the m:module subgenerator with the argument ' + this.name + '.');

    this.module = utils.textToCamel(this.name);
    this.fileName = utils.camelToSnake(this.module);
  },

  writing: function () {
    var moduleFolder = 'app/' + this.fileName + '/';
    this.mkdir(moduleFolder);
    this.template('_module.js', moduleFolder + this.fileName + '.js');
    this.mkdir(moduleFolder + 'assets/');
    this.mkdir(moduleFolder + 'controllers/');
    this.mkdir(moduleFolder + 'directives/');
    this.mkdir(moduleFolder + 'templates/');
    this.mkdir(moduleFolder + 'services/');
    this.mkdir(moduleFolder + 'styles/');
    this.mkdir(moduleFolder + 'assets/');
  }
});

module.exports = MGenerator;
