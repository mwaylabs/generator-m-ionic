'use strict';
var yeoman = require('yeoman-generator');
var utils = require('../../utils/utils.js');

module.exports = yeoman.Base.extend({

  initializing: function () {
    this.log('You called the m-ionic:service subgenerator.');

    // arguments
    this.argument('name', {
      required: true,
      type: String,
      desc: 'The subgenerator name'
    });
    this.argument('module', { type: String, required: false });

    this.moduleName =  utils.checkModule(this.module);
    this.moduleFolder = utils.moduleFolder(this.moduleName);

    this.serviceName = utils.serviceName(this.name);
    this.fileName = utils.fileName(this.serviceName);
  },

  writing: function () {
    // create service with snake-case file name
    var folder = 'app/' + this.moduleFolder + '/services/';
    this.template('_service.js', folder + this.fileName + '-serv.js');
    // create karma test file
    var testFolder = 'test/karma/' + this.moduleFolder + '/';
    this.template('_service.spec.js', testFolder + this.fileName + '-serv.spec.js');
  }
});
