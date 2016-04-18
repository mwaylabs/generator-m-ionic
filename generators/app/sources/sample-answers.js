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
      'ionic-plugin-keyboard'
    ],
    template: 'tabs',
    ecosystems: []
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
    if (options && options.localforage === false) {
      var bowerPackages = standardCopy.bowerPackages.filter(function (value) {
        return value.indexOf('localforage') === -1;
      });
      standardCopy.bowerPackages = bowerPackages;
    }
    if (options && options.appmobi) {
      standardCopy.ecosystems.push('appmobi');
      standardCopy['APP_NAME'] = '0f50dcbf-5c79-41ee-b038-330de3ee07a5.Test';
      standardCopy['PROJECT_ID'] = '5buk7ayx';
      standardCopy['CONFIG_URL'] = 'https://cloud.appmobi.com';
    }
    if (options && options['ionic-platform']) {
      standardCopy.ecosystems.push('ionic-platform');
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
