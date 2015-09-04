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
      for (var i = 0, component; ((component = bowerConfig.optional[i])); i++) {
        if (component.value) {
          packages.push(component.value);
        }
      }
      return packages;
    })(),
    ionicCss: true,
    platforms: [
      'ios',
      'android'
    ],
    plugins: [
      'cordova-plugin-device',
      'cordova-plugin-dialogs',
      'com.ionic.keyboard'
    ],
    template: 'tabs'
  },

  /**
   * return a copy of the standard answers
   * @return {object}
   */
  getStandard: function (options) {
    var standardCopy = JSON.parse(JSON.stringify(this.standard));
    if (options && options['ios-only']) {
      standardCopy.platforms = ['ios'];
    }
    if (options && options['android-only']) {
      standardCopy.platforms = ['android'];
    }
    if (options && options.cordova === false) {
      standardCopy.platforms = [];
      standardCopy.plugins = [];
    }
    if (options && options.ionicCss !== undefined) {
      standardCopy.ionicCss = options.ionicCss;
    }
    return standardCopy;
  },

  getForAppNameOption: function () {
    var standard = this.getStandard();
    delete standard.appName;
    delete standard.appModule;
    return standard;
  }
};
