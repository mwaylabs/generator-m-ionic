'use strict';
var yeoman = require('yeoman-generator');
var utils = require('../utils/utils.js');
var mkdirp = require('mkdirp');

var sampleAnswers = require('../app/sources/sample-answers.js');

var MGenerator = yeoman.generators.NamedBase.extend({

  initializing: function () {
    this.log('You called the m:module subgenerator with the argument ' + this.name + '.');

    this.moduleName = utils.moduleName(this.name);
    this.controllerName = utils.controllerName(this.name);
    this.fileName = utils.fileName(this.name);
    this.moduleFolder = utils.moduleFolder(this.moduleName);
  },

  prompting: function () {
    // prompt and save results in this.answers

    if (!this.options['skip-prompts']) {
      // tell yeoman we're doing asynchronous stuff here
      // so it can wait with subsequent tasks
      var done = this.async();

      this.prompt(
      {
        type: 'list',
        name: 'template',
        message: 'Choose a starter template',
        choices: [
          {
            value: 'tabs',
            name: 'tabs',
          },
          {
            value: 'sidemenu',
            name: 'sidemenu'
          }
        ]
      }, function (answers) { // prompt
        this.answers = answers;

        done();
      }.bind(this));
    }
    else {
      this.answers = sampleAnswers.getStandard();
    }
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
      arguments: this.name + ' ' + this.moduleName,
      options: {
        sample: 'start'
      }
    };
    this.composeWith('m:template', options);
    this.composeWith('m:service', options);
    this.composeWith('m:controller', options);
    // create config constant
    this.composeWith('m:constant', {
      arguments: utils.configName(this.moduleName) + ' ' + this.moduleName,
      options: options.options
    });

    if (this.options && this.options.mainModule) {
      this.copy('env-dev.json', moduleFolder + 'constants/env-dev.json');
      this.copy('env-prod.json', moduleFolder + 'constants/env-prod.json');
    }

  }
});

module.exports = MGenerator;
