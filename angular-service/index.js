'use strict';
var yeoman = require('yeoman-generator');
var utils = require('../utils/utils.js');

var GulpIonicGenerator = yeoman.generators.NamedBase.extend({

  initializing: function () {
    this.log('You called the gulp-ionic:angular-service subgenerator.');

    // retrieve config for templating
    this.answers = this.config.getAll().answers;

    // force first character uppercase
    this.name = utils.firstUpper(this.name);
  },

  writing: function () {
    // create service with snake-case file name
    this.template('_service.js', 'app/scripts/services/' + utils.camelToSnake(this.name) + '.js');
  }
});

module.exports = GulpIonicGenerator;
