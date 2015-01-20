'use strict';
var yeoman = require('yeoman-generator');
var utils = require('../utils/utils.js');

var MGenerator = yeoman.generators.NamedBase.extend({

  initializing: function () {
    this.argument('module', { type: String, required: false });
    this.module =  utils.checkModule(this.module);
    this.moduleFolder = utils.camelToSnake(this.module);

    this.log('You called the m:partial subgenerator.');

    this.fileName = utils.camelToSnake(this.name);
  },

  writing: function () {
    // create partial with snake-case file name
    var folder = 'app/' + this.moduleFolder + '/templates/';
    this.template('_partial.html', folder + this.fileName + '.html');
  }
});

module.exports = MGenerator;
