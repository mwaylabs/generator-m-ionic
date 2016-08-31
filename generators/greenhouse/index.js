'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.Base.extend({
  writing: function () {
    this.copy('greenhouse.sh', 'greenhouse.sh');
  }
});
