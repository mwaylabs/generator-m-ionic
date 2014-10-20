'use strict';
var yeoman = require('yeoman-generator');
var utils = require('../utils/utils.js');

var GulpIonicGenerator = yeoman.generators.NamedBase.extend({

  initializing: function () {
    this.log('You called the m:angular-controller subgenerator.');

    // retrieve config for templating
    this.answers = this.config.getAll().answers;

    // force first character uppercase
    this.name = utils.firstUpper(this.name);

    // enforce Ctrl name ending
    if (this.name.substr(-4) !== 'Ctrl') {
      this.name = this.name + 'Ctrl';
    }
  },

  writing: function () {
    // create controller with snake-case file name
    this.template('_controller.js', 'app/scripts/controllers/' + utils.camelToSnake(this.name) + '.js');
  }
});

module.exports = GulpIonicGenerator;
