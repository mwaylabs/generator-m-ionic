'use strict';
var yeoman = require('yeoman-generator');
var utils = require('../utils/utils.js');

var MGenerator = yeoman.generators.NamedBase.extend({

  initializing: function () {
    this.argument('module', { type: String, required: false });
    this.moduleName = utils.checkModule(this.module);
    this.moduleFolder = utils.moduleFolder(this.moduleName);

    this.log('You called the m:controller subgenerator.');

    this.controllerName = utils.controllerName(this.name);
    this.fileName = utils.fileName(this.controllerName);
  },

  writing: function () {
    // create controller with snake-case file name
    var folder = 'app/' + this.moduleFolder + '/controllers/';
    this.template('_controller.js', folder + this.fileName + '.js');
  }
});

module.exports = MGenerator;
