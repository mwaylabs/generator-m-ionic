'use strict';
var Generator = require('yeoman-generator');
var utils = require('../../utils/utils.js');

module.exports = Generator.extend({

  initializing: function () {
    // arguments
    this.argument('name', {
      required: true,
      type: String,
      desc: 'The subgenerator name'
    });
    this.argument('module', { type: String, required: false });

    this.moduleName =  utils.checkModule(this.module);
    this.moduleFolder = utils.moduleFolder(this.moduleName);

    this.constantName = this.name;
    this.fileName = utils.fileName(this.constantName);
  },

  writing: function () {
    // create constant with snake-case file name
    var folder = 'app/' + this.moduleFolder + '/constants/';
    this.template('_constant.js', folder + this.fileName + '-const.js');
  }
});
