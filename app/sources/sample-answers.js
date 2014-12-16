'use strict';

// localmodules
var bowerConfig = require('./bower-config.js');

module.exports = {
  standard: {
    appModule: 'myProject', // include appModule here, so it's easier to test for it!
    appName: 'My Project',
    appId: 'com.company.project',
    bowerPackages: (function () { // list all packages from the bower-config optional list
      var packages = [];
      for (var i = 0, component; (component = bowerConfig.optional[i]); i++) {
        if (component.value) {
          packages.push(component.value);
        }
      }
      return packages;
    })(),
    ionicSass: true,
    stableVersions: true,
    platforms: [
      'ios',
      'android'
    ],
    plugins: [
      'org.apache.cordova.device',
      'org.apache.cordova.dialogs'
    ],
    includeSass: true
  },

  /**
   * return a copy of the standard answers
   * @return {object}
   */
  getStandard: function () {
    return JSON.parse(JSON.stringify(this.standard));
  },

  getLatestVersions: function () {
    var standard = this.getStandard();
    standard.stableVersions = false;
    return standard;
  },

  getAppNameOption: function () {
    var standard = this.getStandard();
    delete standard.appName;
    delete standard.appModule;
    return standard;
  }
};
