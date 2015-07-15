'use strict';
var yeoman = require('yeoman-generator');
var utils = require('../utils/utils.js');

var MGenerator = yeoman.generators.NamedBase.extend({

  initializing: function () {
    this.argument('module', { type: String, required: false });
    this.moduleName =  utils.checkModule(this.module);
    this.moduleFolder = utils.moduleFolder(this.moduleName);
    this.barColor = utils.barColor();

    this.log('You called the m:template subgenerator.');

    this.templateName = this.name;
    this.fileName = utils.fileName(this.templateName);
  },

  writing: function () {
    // create template with snake-case file name
    var folder = 'app/' + this.moduleFolder + '/templates/';
    if (!this.options.template) {
      this.template('_template.html', folder + this.fileName + '.html');
    }
    else if (this.options.template === 'debug') {
      this.template('_debug.html', folder + this.fileName + '.html');
    }
    else if (this.options.template === 'list-detail') {
      this.template('list-detail.html', folder + this.fileName + '.html');
    }
    else if (this.options.template === 'list') {
      this.template('_list.html', folder + this.fileName + '.html');
    }
    else if (this.options.template === 'menu') {
      this.template('_menu.html', folder + this.fileName + '.html');
    }
    else if (this.options.template === 'tabs') {
      this.template('_tabs.html', folder + this.fileName + '.html');
    }
  }
});

module.exports = MGenerator;
