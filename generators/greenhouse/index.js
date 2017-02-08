'use strict';
var Generator = require('yeoman-generator');

module.exports = Generator.extend({
  writing: function () {
    this.fs.copy(
      this.templatePath('greenhouse.sh'),
      this.destinationPath('greenhouse.sh')
    );
  }
});
