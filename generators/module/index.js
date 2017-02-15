'use strict';
var Generator = require('yeoman-generator');
var mkdirp = require('mkdirp');

var utils = require('../../utils/utils.js');
var sampleAnswers = require('../app/sources/sample-answers.js');

module.exports = Generator.extend({

  initializing: function () {
    // arguments
    this.argument('name', {
      required: true,
      type: String,
      desc: 'The subgenerator name'
    });

    var moduleName = utils.moduleName(this.options.name);
    this.templateVars = {
      options: this.options,
      moduleName: moduleName,
      controllerName: utils.controllerName(this.options.name),
      fileName: utils.fileName(this.options.name),
      moduleFolder: utils.moduleFolder(moduleName)
    };
  },

  prompting: function () {
    // prompt and save results in this.answers

    if (!this.options['skip-prompts']) {
      // tell yeoman we're doing asynchronous stuff here
      // so it can wait with subsequent tasks

      return this.prompt({
        type: 'list',
        name: 'template',
        message: '\nChoose a starter template\n',
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
      })
      .then(function (answers) { // prompt
        this.answers = this.templateVars.answers = answers;
      }.bind(this));
    }
    else {
      this.answers = this.templateVars.answers = sampleAnswers.getStandard();
    }
  },

  writing: function () {

    // basic files
    var modulePath = 'app/' + this.templateVars.moduleFolder;
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
      this.templateVars.menuCtrlName = utils.controllerName('Menu');
      this.templateVars.debugCtrlName = utils.controllerName('Debug');
    }
    else {
      this.templateVars.menuCtrlName = utils.controllerName(this.templateVars.moduleName + 'Menu');
      this.templateVars.debugCtrlName = utils.controllerName(this.templateVars.moduleName + 'Debug');
    }
    this.fs.copyTpl(
      this.templatePath('_module.js'),
      this.destinationPath(modulePath + '/' + this.templateVars.moduleFolder + '.js'),
      this.templateVars
    );
    this.fs.copyTpl(
      this.templatePath('_module.scss'),
      this.destinationPath(modulePath + '/styles/' + this.templateVars.moduleFolder + '.scss'),
      this.templateVars
    );
    // create config constant
    this.composeWith('m-ionic:constant', {
      arguments: utils.configName(this.templateVars.moduleName) + ' ' + this.templateVars.moduleName,
      template: 'config'
    });

    // main module files
    if (this.options.mainModule) {
      this.fs.copy(
        this.templatePath('env-dev.json'),
        this.destinationPath(modulePath + '/constants/env-dev.json')
      );
      this.fs.copy(
        this.templatePath('env-prod.json'),
        this.destinationPath(modulePath + '/constants/env-prod.json')
      );
    }

    // both (sidemenu & tabs)
    if (this.answers.template !== 'blank') {
      // yo@2x.png
      this.fs.copy(
        this.templatePath('yo.png'),
        this.destinationPath(modulePath + '/assets/images/yo@2x.png')
      );
      // spec file
      this.fs.copyTpl(
        this.templatePath('_module-debug.spec.js'),
        this.destinationPath('test/protractor/' + this.templateVars.moduleFolder + '/debug.spec.js'),
        this.templateVars
      );

      // debug
      this.composeWith('m-ionic:controller', {
        arguments: this.templateVars.debugCtrlName + ' ' + this.templateVars.moduleName,
        template: 'debug'
      });
      this.composeWith('m-ionic:template', {
        arguments: 'debug ' + this.templateVars.moduleName,
        template: 'debug'
      });
      this.composeWith('m-ionic:service', {
        arguments: this.options.name + ' ' + this.templateVars.moduleName,
        template: 'debug'
      });

      // other templates
      this.composeWith('m-ionic:template', {
        arguments: 'list ' + this.templateVars.moduleName,
        template: 'list'
      });
      this.composeWith('m-ionic:template', {
        arguments: 'list-detail ' + this.templateVars.moduleName,
        template: 'list-detail'
      });
    }
    // sidemenu
    if (this.answers.template === 'sidemenu') {
      // menu
      this.composeWith('m-ionic:controller', {
        arguments: this.templateVars.menuCtrlName + ' ' + this.templateVars.moduleName,
      });
      this.composeWith('m-ionic:template', {
        arguments: 'menu ' + this.templateVars.moduleName,
        template: 'menu'
      });
    }

    // tabs
    if (this.answers.template === 'tabs') {
      // tabs
      this.composeWith('m-ionic:template', {
        arguments: 'tabs ' + this.templateVars.moduleName,
        template: 'tabs'
      });
    }
  }
});
