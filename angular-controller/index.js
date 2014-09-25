'use strict';

var yeoman = require('yeoman-generator');
var utils = require('../utils/utils.js');

var GulpIonicGenerator = yeoman.generators.NamedBase.extend({

  initializing: function () {
    this.log('You called the gulp-ionic subgenerator with the argument ' + this.name + '.');

    // enforce Ctrl name ending
    if (this.name.substr(-4) !== 'Ctrl') {
      this.name = this.name + 'Ctrl';
    }
  },

  asdf: function () {
    this.log(this.name, utils.camelToSnake(this.name));
    this.answers = this.config.getAll().answers;
  },

  writing: function () {
    this.template('_controller.js', 'app/scripts/controllers/' + utils.camelToSnake(this.name) + '.js');
  }
});

module.exports = GulpIonicGenerator;
