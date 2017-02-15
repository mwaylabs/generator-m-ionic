'use strict';

var utils = require('../../../utils/utils.js');
var bowerConfig = require('./bower-config.js');
var cordovaConfig = require('./cordova-config.js');

module.exports = {
  main: [
    // appName
    {
      type: 'input',
      name: 'appName',
      message: '\nEnter a name for your project \nThis name will be displayed below the app icon.\n',
      validate: utils.validateAppName,
      when: function () {
        // Show this prompt only if appName is not already set
        return !this.appName;
      }.bind(this)
    },
    // appId
    {
      type: 'input',
      name: 'appId',
      message: '\nEnter an app identifier for your project \ne.g. com.company.project\n',
      validate: utils.validateAppId
    },
    // ionic css
    {
      type: 'list',
      name: 'ionicCss',
      message: '\nInclude Ionic styles as CSS or Sass\n',
      choices: [
        {
          name: 'Ionic CSS (faster, for starters)',
          value: true
        },
        {
          name: 'Ionic Sass (more flexible, for pros)',
          value: false
        }
      ]
    },
    // bower packages
    {
      type: 'checkbox',
      name: 'bowerPackages',
      message: '\nChoose additional bower packages \nBesides angular, ionic, angular-ui-router and ngCordova.\n',
      choices: bowerConfig.optional
    },
    // select platforms
    {
      type: 'checkbox',
      name: 'platforms',
      message: '\nSelect Cordova platforms \nOnly works if you have the platforms correctly set up.\n',
      choices: cordovaConfig.platforms
    },
    // select plugins
    {
      type: 'checkbox',
      name: 'plugins',
      message: '\nSelect Cordova plugins \nInstall more later at any time.\n',
      choices: cordovaConfig.plugins
    },
  ],
  ecosystems: [
    {
      type: 'checkbox',
      name: 'ecosystems',
      message: '\nIntegrate into the following ecosystems \nCan also be done later, check out the README for further instructions.\n',
      choices: [{
        name: 'Greenhouse & Relution  (build and distribute your app in the cloud)',
        value: 'greenhouse'
      }, {
        name: 'Ionic Cloud            (beta)',
        value: 'ionic-cloud'
      }, {
        name: 'Appmobi                (have your APP_NAME, PROJECT_ID & CONFIG_URL ready)',
        value: 'appmobi'
      }, {
        name: 'ApiOmat                (beta)',
        value: 'apiomat'
      }]
    }
  ],
  install: [
    {
      type: 'list',
      name: 'install',
      message: '\nInstall dependencies via Bower and:\n',
      choices: [
        {
          name: 'yarn (faster)',
          value: 'yarn'
        },
        {
          name: 'npm (more established, reliable)',
          value: 'npm'
        }
      ]
    }
  ]
};
