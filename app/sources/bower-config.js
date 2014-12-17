'use strict';

var inquirer = require('inquirer');

module.exports = {
  bowerJSON: {
    dependencies: {
      'ionic': 'v1.0.0-beta.14',
      'angular': '~1.3.7',
      'angular-animate': '~1.3.7',
      'angular-sanitize': '~1.3.7',
      'angular-ui-router': '~0.2.13',
      'ngCordova': '~0.1.8-alpha'
    },
    devDependencies: {
    },
    resolutions: {
      // force newest angular versions (not those from ionic)
      'angular': '1.3.7',
      'angular-animate': '1.3.7',
      'angular-sanitize': '1.3.7'
    }
  },
  optional: [
    new inquirer.Separator('---- i18n/l10n ----'),
    {
      value: 'angular-dynamic-locale#~0.1.24',
      name: 'angular-dynamic-locale',
      checked: true
    },
    {
      value: 'angular-translate#~2.5.2',
      name: 'angular-translate',
      checked: true
    },
    {
      value: 'angular-translate-loader-static-files#~2.5.2',
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
      value: 'angular-touch#~1.3.7',
      name: 'angular-touch',
      checked: true
    },
    {
      value: 'fastclick#~1.0.3',
      name: 'fastclick',
      checked: true
    },
    {
      value: 'angular-ui-bootstrap-bower#~0.12.0',
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
