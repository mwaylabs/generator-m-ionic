'use strict';
var yeoman = require('yeoman-generator');
var utils = require('../utils/utils.js');
var mkdirp = require('mkdirp');

var MGenerator = yeoman.generators.NamedBase.extend({

  initializing: function () {
    this.log('You called the m:module subgenerator with the argument ' + this.name + '.');

    this.moduleName = utils.moduleName(this.name);
    this.moduleFolder = utils.moduleFolder(this.moduleName);
  },

  writing: function () {
    var moduleFolder = 'app/' + this.moduleFolder + '/';
    mkdirp.sync(moduleFolder);
    this.template('_module.js', moduleFolder + this.moduleFolder + '.js');
    this.copy('yo.png', moduleFolder + 'assets/images/yo@2x.png');
    mkdirp.sync(moduleFolder + 'constants/');
    mkdirp.sync(moduleFolder + 'controllers/');
    mkdirp.sync(moduleFolder + 'directives/');
    mkdirp.sync(moduleFolder + 'filters/');
    mkdirp.sync(moduleFolder + 'services/');
    mkdirp.sync(moduleFolder + 'styles/');
    this.template('_module.scss', moduleFolder + 'styles/module.scss');
    mkdirp.sync(moduleFolder + 'templates/');

    var options = {
      arguments: 'start ' + this.moduleName,
      options: {
        sample: 'start'
      }
    };
    this.composeWith('m:template', options);
    this.composeWith('m:service', options);
    this.composeWith('m:controller', options);
    // create config constant
    this.composeWith('m:constant', {
      arguments: 'Config ' + this.moduleName,
      options: options.options
    });

    if (this.options && this.options.sample === 'start') {
      this.copy('env-dev.json', moduleFolder + 'constants/env-dev.json');
      this.copy('env-prod.json', moduleFolder + 'constants/env-prod.json');
    }
  }
});

module.exports = MGenerator;
