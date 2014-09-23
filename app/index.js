'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var spawn = require('child_process').spawn;
var exec = require('child_process').exec;
var cordova = require('cordova-lib').cordova.raw; // get the promise version of all functions

var GulpIonicGenerator = yeoman.generators.Base.extend({
  // initializing: function () {
  //   this.pkg = require('../package.json');
  // },

  // prompting: function () {
  //   // say hello
  //   this.log(yosay(
  //     'Welcome to the polished GulpIonic generator!'
  //   ));

  //   // tell yeoman we're doing asynchronous stuff here
  //   // so it can wait with subsequent tasks
  //   var done = this.async();

  //   var prompts = [
  //     // appName
  //     {
  //       type: 'input',
  //       name: 'appName',
  //       message: 'state the name of your project (the name that will be displayed below the app icon)',
  //       validate: function (value) {
  //         return value ? true : 'Please enter a name ';
  //       }
  //     },
  //     // appId
  //     {
  //       type: 'input',
  //       name: 'appId',
  //       message: 'state the id of your project (e.g. com.company.project)',
  //       validate: function (value) {
  //         var splits = value.split('.').filter(function (element) {
  //           return element.length;
  //         });
  //         return splits.length >= 3 ? true : 'Please enter a valid id! E.g. com.company.project';
  //       }
  //     },
  //     // stableVersions
  //     {
  //       type: 'list',
  //       name: 'stableVersions',
  //       message: 'Do you want to use components (bower & npm) we deem stable or the latest ones?',
  //       choices: [
  //         {
  //           value: true,
  //           name: 'stable (recommended)',
  //           default: true
  //         },
  //         {
  //           value: false,
  //           name: 'latest (experienced)',
  //         }
  //       ]
  //     },
  //     // check platforms
  //     {
  //       type: 'checkbox',
  //       name: 'platforms',
  //       message: 'Select all platforms you want to support:',
  //       choices: [
  //         {
  //           value: 'ios',
  //           name: 'iOS',
  //           checked: true
  //         },
  //         {
  //           value: 'android',
  //           name: 'Android',
  //           checked: true
  //         }
  //       ]
  //     },
  //     // check plugins
  //     {
  //       type: 'checkbox',
  //       name: 'plugins',
  //       message: 'Select all cordova plugins you want to install',
  //       choices: [
  //         new yeoman.inquirer.Separator(),
  //         {
  //           value: 'org.apache.cordova.device',
  //           name: 'Device - org.apache.cordova.device'
  //         },
  //         {
  //           value: 'org.apache.cordova.dialogs',
  //           name: 'Dialogs - org.apache.cordova.dialogs'
  //         },
  //         {
  //           value: 'org.apache.cordova.network-information',
  //           name: 'Network - org.apache.cordova.network-information'
  //         },
  //         {
  //           value: 'org.apache.cordova.splashscreen',
  //           name: 'Splashscreen - org.apache.cordova.splashscreen'
  //         },
  //         {
  //           value: 'https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin.git',
  //           name: 'Toast - https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin.git'
  //         },
  //         {
  //           value: 'org.apache.cordova.vibration',
  //           name: 'Vibration - org.apache.cordova.vibration'
  //         },
  //       ]
  //     },
  //   ];

  //   // prompt and save results in this.answers
  //   yeoman.inquirer.prompt(prompts, function (answers) {
  //     this.answers = answers;
  //     this.log(chalk.inverse(JSON.stringify(this.answers, null, '  ')));
  //     done();
  //   }.bind(this));
  // },

  writing: {

    app: function () {
       // debugging
      this.pkg = {
        name: 'pkgName',
        version: 'pkgVersion'
      };
      this.answers = {
        "appName": "asdf",
        "appId": "asdf.asdf.asdf",
        "includeSass": true,
        "stableVersions": true,
        "platforms": [
          "ios",
          "android"
        ],
        "plugins": [
          "org.apache.cordova.device",
          "org.apache.cordova.dialogs",
          "org.apache.cordova.network-information",
          "org.apache.cordova.splashscreen"
        ],
      };

      // set initial dependencies
      this.bower = {
        dependencies: {
          'ionic': 'v1.0.0-beta.12',
          'angular': '~1.3.0-rc.2',
          'angular-ui-router': '~0.2.10',
          'ngCordova': '~0.1.4-alpha'
        },
        devDependencies: {

        },
        resolutions: {
          'angular': '1.3.0-rc.2'
        }
      };

      // set all deps to latest?
      if (!this.answers.stableVersions) {
        for (var topKey in this.bower) {
          for (var key in this.bower[topKey]) {
            this.bower[topKey][key] = 'latest';
          }
        }
      }

      this.bower.dependencies = JSON.stringify(this.bower.dependencies, null, '  ');
      this.bower.devDependencies = JSON.stringify(this.bower.devDependencies, null, '  ');
      this.bower.resolutions = JSON.stringify(this.bower.resolutions, null, '  ');

      this.dest.mkdir('app');
      this.dest.mkdir('app/templates');

      // app  files
      this.template('_bower.json', 'bower.json');
      this.template('_gulpfile.js', 'gulpfile.js');
      this.template('_index.html', 'app/index.html');

      var css = 'main.' + (this.answers.includeSass ? 's' : '') + 'css';
      this.copy(css, 'app/styles/' + css);

      // app files

    },

    projectfiles: function () {

      this.template('_package.json', 'package.json');
      this.src.copy('editorconfig', '.editorconfig');
      this.src.copy('gitattributes', '.gitattributes');
      this.src.copy('gitignore', '.gitignore');
      this.src.copy('jscsrc', '.jscsrc');
      this.src.copy('jshintrc', '.jshintrc');
      this.src.copy('jshintignore', '.jshintignore');
      this.src.copy('jshintrc', '.jshintrc');
    }
  },

  // install: function () {
  //   // cordova project
  //   cordova.create('.', this.answers.appId, this.answers.appName)
  //   // add platforms
  //   .then(function () {
  //     this.log(chalk.green('Created cordova project'));
  //     return cordova.platform('add', this.answers.platforms);
  //   }.bind(this))
  //   // add plugins
  //   .then(function () {
  //     this.log(chalk.green('Added platforms: ' + this.answers.platforms.join(', ')));
  //     return cordova.plugins('add', this.answers.plugins);
  //   }.bind(this))
  //   // all
  //   .then(function () {
  //     this.log(chalk.green('Added plugins: ' + this.answers.plugins.join(', ')));
  //     this.log(chalk.green('Cordova project was set up successfully!'));
  //   }.bind(this))
  //   .catch(function (err) {
  //     this.log(chalk.red('Couldn\'t finish generator: ' + err));
  //   }.bind(this));

  // },

  // end: function () {
  //   this.installDependencies();
  // }
});

module.exports = GulpIonicGenerator;
