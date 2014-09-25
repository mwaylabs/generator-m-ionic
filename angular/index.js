'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');


var GulpIonicGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.argument('component', {
      required: true,
      type: 'String'
    });
    this.log('You called the gulp-ionic subgenerator with the argument ' + this.argument + '.');
  },

  writing: function () {
    this.src.copy('somefile.js', 'somefile.js');
  }
});

module.exports = GulpIonicGenerator;
