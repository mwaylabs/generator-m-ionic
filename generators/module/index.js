'use strict';
var yeoman = require('yeoman-generator');
var mkdirp = require('mkdirp');

var utils = require('../../utils/utils.js');
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
            value: 'sidemenu',
            name: 'sidemenu'
          },
          {
            value: 'tabs',
            name: 'tabs',
          },
          {
            value: 'blank',
            name: 'blank'
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

    // basic files
    var modulePath = 'app/' + this.moduleFolder;
    mkdirp.sync(modulePath);
    mkdirp.sync(modulePath + '/assets/images');
    mkdirp.sync(modulePath + '/constants/');
    mkdirp.sync(modulePath + '/controllers/');
    mkdirp.sync(modulePath + '/directives/');
    mkdirp.sync(modulePath + '/filters/');
    mkdirp.sync(modulePath + '/services/');
    mkdirp.sync(modulePath + '/styles/');
    mkdirp.sync(modulePath + '/templates/');

    // basic templated files
    if (this.options.mainModule) {
      this.menuCtrlName = utils.controllerName('Menu');
      this.debugCtrlName = utils.controllerName('Debug');
    }
    else {
      this.menuCtrlName = utils.controllerName(this.moduleName + 'Menu');
      this.debugCtrlName = utils.controllerName(this.moduleName + 'Debug');
    }
    this.template('_module.js', modulePath + '/' + this.moduleFolder + '.js');
    this.template('_module.scss', modulePath + '/styles/' + this.moduleFolder + '.scss');
    // create config constant
    this.composeWith('m:constant', {
      arguments: utils.configName(this.moduleName) + ' ' + this.moduleName,
      options: {
        template: 'config'
      }
    });

    // main module files
    if (this.options.mainModule) {
      this.copy('env-dev.json', modulePath + '/constants/env-dev.json');
      this.copy('env-prod.json', modulePath + '/constants/env-prod.json');
    }

    // both (sidemenu & tabs)
    if (this.answers.template !== 'blank') {
      // yo@2x.png
      this.copy('yo.png', modulePath + '/assets/images/yo@2x.png');
      // spec file
      this.template('_module-debug.spec.js', 'test/protractor/' + this.moduleFolder + '-debug.spec.js');

      // debug
      this.composeWith('m:controller', {
        arguments: this.debugCtrlName + ' ' + this.moduleName,
        options: { template: 'debug' }
      });
      this.composeWith('m:template', {
        arguments: 'debug ' + this.moduleName,
        options: { template: 'debug' }
      });
      this.composeWith('m:service', {
        arguments: this.name + ' ' + this.moduleName,
        options: {  template: 'debug' }
      });

      // other templates
      this.composeWith('m:template', {
        arguments: 'list ' + this.moduleName,
        options: { template: 'list' }
      });
      this.composeWith('m:template', {
        arguments: 'list-detail ' + this.moduleName,
        options: { template: 'list-detail' }
      });
    }
    // sidemenu
    if (this.answers.template === 'sidemenu') {
      // menu
      this.composeWith('m:controller', {
        arguments: this.menuCtrlName + ' ' + this.moduleName,
      });
      this.composeWith('m:template', {
        arguments: 'menu ' + this.moduleName,
        options: { template: 'menu' }
      });
    }

    // tabs
    if (this.answers.template === 'tabs') {
      // tabs
      this.composeWith('m:template', {
        arguments: 'tabs ' + this.moduleName,
        options: { template: 'tabs' }
      });
    }
  }
});

module.exports = MGenerator;
