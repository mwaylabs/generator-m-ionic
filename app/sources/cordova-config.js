'use strict';

var inquirer = require('inquirer');

module.exports = {
  platforms: [
    {
      value: 'ios',
      name: 'iOS',
      checked: true
    },
    {
      value: 'android',
      name: 'Android',
      checked: true
    }
  ],
  plugins: [
    new inquirer.Separator('-------'),
    {
      value: 'org.apache.cordova.device',
      name: 'Device - org.apache.cordova.device',
      checked: true
    },
    {
      value: 'org.apache.cordova.dialogs',
      name: 'Dialogs - org.apache.cordova.dialogs'
    },
    {
      value: 'org.apache.cordova.inappbrowser',
      name: 'In App Browser - org.apache.cordova.inappbrowser'
    },
    {
      value: 'org.apache.cordova.network-information',
      name: 'Network - org.apache.cordova.network-information'
    },
    {
      value: 'org.apache.cordova.splashscreen',
      name: 'Splashscreen - org.apache.cordova.splashscreen'
    },
    {
      value: 'org.apache.cordova.statusbar',
      name: 'Statusbar - org.apache.cordova.statusbar'
    },
  ]
};
