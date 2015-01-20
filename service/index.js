'use strict';
var yeoman = require('yeoman-generator');
var utils = require('../utils/utils.js');

var MGenerator = yeoman.generators.NamedBase.extend({

  initializing: function () {
    this.argument('module', { type: String, required: false });
    this.module =  utils.checkModule(this.module);
    this.moduleFolder = utils.camelToSnake(this.module);

    this.log('You called the m:service subgenerator.');

    // force first character uppercase
    this.fileName = utils.camelToSnake(this.name);
  },

  writing: function () {
    // create service with snake-case file name
    var folder = 'app/' + this.moduleFolder + '/services/';
    this.template('_service.js', folder + this.fileName + '-service.js');
  }
});

module.exports = MGenerator;
