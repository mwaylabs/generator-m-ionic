'use strict';
var yeoman = require('yeoman-generator');
var utils = require('../utils/utils.js');

var GulpIonicGenerator = yeoman.generators.NamedBase.extend({

  initializing: function () {
    this.log('You called the gulp-ionic:angular-view subgenerator.');
  },

  writing: function () {
    // create view with snake-case file name
    this.template('_view.html', 'app/views/' + utils.camelToSnake(this.name) + '.html');
  }
});

module.exports = GulpIonicGenerator;
