'use strict';

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
    },
    {
      value: 'windows',
      name: 'Windows',
      checked: false
    },
    {
      value: 'browser',
      name: 'Browser',
      checked: false
    }
  ],
  plugins: [
    {
      type: 'separator',
      line: '------'
    },
    {
      value: 'cordova-plugin-device',
      name: 'Device - cordova-plugin-device',
      checked: true
    },
    {
      value: 'cordova-plugin-dialogs',
      name: 'Dialogs - cordova-plugin-dialogs'
    },
    {
      value: 'cordova-plugin-inappbrowser',
      name: 'In App Browser - cordova-plugin-inappbrowser'
    },
    {
      value: 'ionic-plugin-keyboard',
      name: 'Keyboard - ionic-plugin-keyboard'
    },
    {
      value: 'cordova-plugin-network-information',
      name: 'Network - cordova-plugin-network-information'
    },
    {
      value: 'cordova-plugin-splashscreen',
      name: 'Splashscreen - cordova-plugin-splashscreen'
    },
    {
      value: 'cordova-plugin-statusbar',
      name: 'Statusbar - cordova-plugin-statusbar'
    },
  ]
};
