'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.Base.extend({

  initializing: function () {
    this.composeWith(require.resolve('generator-appmobi/generators/app/index.js'));
  }

});
