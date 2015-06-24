'use strict';

var inquirer = require('inquirer');

module.exports = {
  bowerJSON: {
    dependencies: {
      'ionic': '~1.0.0',
      'angular': '~1.4.1',
      'angular-animate': '~1.4.1',
      'angular-sanitize': '~1.4.1',
      'angular-ui-router': '~0.2.15',
      'ngCordova': '~0.1.17-alpha'
    },
    devDependencies: {
    },
    resolutions: {
      // force newest angular versions (not those from ionic)
      'angular': '~1.4.1',
      'angular-animate': '~1.4.1',
      'angular-sanitize': '~1.4.1',
      'angular-ui-router': '~0.2.15'
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
      value: 'angular-translate#~2.7.0',
      name: 'angular-translate',
      checked: true
    },
    {
      value: 'angular-translate-loader-static-files#~2.7.0',
      name: 'angular-translate-loader-static-files',
      checked: true
    },
    new inquirer.Separator('---- persistence ----'),
    {
      value: 'angular-localForage#~1.2.2',
      name: 'angular-localForage',
      checked: true
    }
  ]
};
