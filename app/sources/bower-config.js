'use strict';

var inquirer = require('inquirer');

module.exports = {
  bowerJSON: {
    dependencies: {
      'ionic': 'v1.0.0-rc.1',
      'angular': '~1.3.14',
      'angular-animate': '~1.3.14',
      'angular-sanitize': '~1.3.14',
      'angular-ui-router': '~0.2.13',
      'ngCordova': '~0.1.12-alpha'
    },
    devDependencies: {
    },
    resolutions: {
      // force newest angular versions (not those from ionic)
      'angular': '~1.3.14',
      'angular-animate': '~1.3.14',
      'angular-sanitize': '~1.3.14'
    }
  },
  optional: [
    new inquirer.Separator('---- i18n/l10n ----'),
    {
      value: 'angular-dynamic-locale#~0.1.27',
      name: 'angular-dynamic-locale',
      checked: true
    },
    {
      value: 'angular-translate#~2.6.0',
      name: 'angular-translate',
      checked: true
    },
    {
      value: 'angular-translate-loader-static-files#~2.6.0',
      name: 'angular-translate-loader-static-files',
      checked: true
    },
    new inquirer.Separator('---- other ----'),
    {
      value: 'angular-localForage#~1.2.2',
      name: 'angular-localForage',
      checked: true
    },
    {
      value: 'angular-touch#~1.3.14',
      name: 'angular-touch',
      checked: true
    },
    {
      value: 'fastclick#~1.0.6',
      name: 'fastclick',
      checked: true
    },
    {
      value: 'angular-ui-bootstrap-bower#~0.12.1',
      name: 'angular-ui-bootstrap-bower',
      checked: false
    },
    {
      value: 'restangular#~1.4.0',
      name: 'restangular',
      checked: false
    }
  ]
};
