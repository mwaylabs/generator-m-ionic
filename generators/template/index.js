'use strict';
var yeoman = require('yeoman-generator');
var utils = require('../../utils/utils.js');

module.exports = yeoman.Base.extend({

  initializing: function () {
    this.log('You called the m-ionic:template subgenerator.');

    // arguments
    this.argument('name', {
      required: true,
      type: String,
      desc: 'The subgenerator name'
    });
    this.argument('module', { type: String, required: false });

    this.moduleName =  utils.checkModule(this.module);
    this.moduleFolder = utils.moduleFolder(this.moduleName);
    this.barColor = utils.barColor();

    this.templateName = this.name;
    this.fileName = utils.fileName(this.templateName);

    // read .yo-rc
    try {
      this.jade = this.config.getAll().answers.jade;
    } catch (e) {
      this.jade = false;
    }

  },

  writing: function () {
    // create template with snake-case file name
    var extension = this.jade ? '.jade' : '.html';

    var folder = 'app/' + this.moduleFolder + '/templates/';
    if (!this.options.template) {
      this.template('_template' + extension, folder + this.fileName + extension);
    }
    else if (this.options.template === 'debug') {
      this.template('_debug' + extension, folder + this.fileName + extension);
    }
    else if (this.options.template === 'list-detail') {
      this.template('list-detail' + extension, folder + this.fileName + extension);
    }
    else if (this.options.template === 'list') {
      this.template('_list' + extension, folder + this.fileName + extension);
    }
    else if (this.options.template === 'menu') {
      this.template('_menu' + extension, folder + this.fileName + extension);
    }
    else if (this.options.template === 'tabs') {
      this.template('_tabs' + extension, folder + this.fileName + extension);
    }
  }
});
