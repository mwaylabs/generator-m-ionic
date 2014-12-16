'use strict';

var inquirer = require('inquirer');

module.exports = {
  bowerJSON: {
    dependencies: {
      'ionic': 'v1.0.0-beta.12',
      'angular': '~1.3.0-rc.2',
      'angular-ui-router': '~0.2.10',
      'ngCordova': '~0.1.4-alpha'
    },
    devDependencies: {

    },
    resolutions: {
      'angular': '~1.3.0-rc.2'
    }
  },
  optional: [
    new inquirer.Separator('---- i18n/l10n ----'),
    {
      value: 'angular-dynamic-locale#~0.1.17',
      name: 'angular-dynamic-locale',
      checked: true
    },
    {
      value: 'angular-translate#~2.4.0',
      name: 'angular-translate',
      checked: true
    },
    {
      value: 'angular-translate-loader-static-files#~2.4.0',
      name: 'angular-translate-loader-static-files',
      checked: true
    },
    new inquirer.Separator('---- other ----'),
    {
      value: 'angular-localForage#~0.2.10',
      name: 'angular-localForage',
      checked: true
    },
    {
      value: 'angular-touch#~1.2.25',
      name: 'angular-touch',
      checked: true
    },
    {
      value: 'angular-ui-bootstrap-bower#~0.11.0',
      name: 'angular-ui-bootstrap-bower',
      checked: true
    },
    {
      value: 'fastclick#~1.0.3',
      name: 'fastclick',
      checked: true
    },
    {
      value: 'restangular#~1.4.0',
      name: 'restangular',
      checked: true
    }
  ]
};
