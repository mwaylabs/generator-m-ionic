'use strict';
var yeoman = require('yeoman-generator');
var utils = require('../utils/utils.js');

var GulpIonicGenerator = yeoman.generators.NamedBase.extend({

  initializing: function () {
    this.log('You called the m:partial subgenerator.');
  },

  writing: function () {
    // create partial with snake-case file name
    this.template('_partial.html', 'app/partials/' + utils.camelToSnake(this.name) + '.html');
  }
});

module.exports = GulpIonicGenerator;
