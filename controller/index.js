'use strict';
var yeoman = require('yeoman-generator');
var utils = require('../utils/utils.js');
var _s = require('underscore.string');

var MGenerator = yeoman.generators.NamedBase.extend({

  initializing: function () {
    this.argument('module', { type: String, required: false });
    this.module =  utils.checkModule(this.module);
    this.moduleFolder = utils.camelToSnake(this.module);

    this.log('You called the m:controller subgenerator.');

    // force first character uppercase
    this.name = _s.capitalize(this.name);
    // enforce Ctrl name ending
    if (this.name.substr(-4) !== 'Ctrl') {
      this.name = this.name + 'Ctrl';
    }
    this.fileName = utils.camelToSnake(this.name);
  },

  writing: function () {
    // create controller with snake-case file name
    var folder = 'app/' + this.moduleFolder + '/controllers/';
    this.template('_controller.js', folder + this.fileName + '.js');
  }
});

module.exports = MGenerator;
