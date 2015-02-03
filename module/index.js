'use strict';
var yeoman = require('yeoman-generator');
var utils = require('../utils/utils.js');

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
    this.copy('yo.png', moduleFolder + 'assets/images/yo@2x.png');
    this.mkdir(moduleFolder + 'controllers/');
    this.mkdir(moduleFolder + 'directives/');
    this.mkdir(moduleFolder + 'services/');
    this.mkdir(moduleFolder + 'styles/');
    this.template('_main.scss', moduleFolder + 'styles/main.scss');
    this.mkdir(moduleFolder + 'templates/');

    var options = {
      arguments: 'start ' + this.module,
      options: {
        sample: 'start'
      }
    };
    this.composeWith('m:template', options);
    this.composeWith('m:service', options);
    this.composeWith('m:controller', options);
  }
});

module.exports = MGenerator;
