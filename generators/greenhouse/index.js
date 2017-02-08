'use strict';
var Generator = require('yeoman-generator');

module.exports = Generator.extend({
  writing: function () {
    this.copy('greenhouse.sh', 'greenhouse.sh');
  }
});
