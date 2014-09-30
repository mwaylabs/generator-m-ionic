'use strict';

var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var cordova = require('cordova-lib').cordova.raw; // get the promise version of all methdos
var wiredep = require('wiredep');

var GulpIonicGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json'); // get package.json content
    // TODO: check if .yo-rc.json exists: options: call subgenerator? update project structure? select subgenerator?
  },

  prompting: function () {
    // say hello
    this.log(yosay(
      'Welcome to the polished GulpIonic generator!'
    ));

    // tell yeoman we're doing asynchronous stuff here
    // so it can wait with subsequent tasks
    var done = this.async();

    var prompts = [
      // appName
      {
        type: 'input',
        name: 'appName',
        message: 'state the name of your project (the name that will be displayed below the app icon)',
        validate: function (value) {
          return value ? true : 'Please enter a name ';
        }
      },
      // appId
      {
        type: 'input',
        name: 'appId',
        message: 'state the id of your project (e.g. com.company.project)',
        validate: function (value) {
          var splits = value.split('.').filter(function (element) {
            return element.length;
          });
          return splits.length >= 3 ? true : 'Please enter a valid id! E.g. com.company.project';
        }
      },
      // bower packages
      {
        type: 'checkbox',
        name: 'bowerPackages',
        message: 'Choose all bower packages in addition to angular, ionic, angular-ui-router, cordova and ngCordova:',
        choices: [
          {
            value: 'angular-dynamic-locale#~0.1.17',
            name: 'angular-dynamic-locale#~0.1.17',
            checked: true
          },
          {
            value: 'angular-localForage#~0.2.10',
            name: 'angular-localForage#~0.2.10',
            checked: true
          },
          {
            value: 'angular-touch#~1.2.25',
            name: 'angular-touch#~1.2.25',
            checked: true
          },
          {
            value: 'angular-translate#~2.4.0',
            name: 'angular-translate#~2.4.0',
            checked: true
          },
          {
            value: 'angular-translate-loader-static-files#~2.4.0',
            name: 'angular-translate-loader-static-files#~2.4.0',
            checked: true
          },
          {
            value: 'angular-ui-bootstrap-bower#~0.11.0',
            name: 'angular-ui-bootstrap-bower#~0.11.0',
            checked: true
          },
          {
            value: 'fastclick#~1.0.3',
            name: 'fastclick#~1.0.3',
            checked: true
          },
          {
            value: 'ratchet#~2.0.2',
            name: 'ratchet#~2.0.2',
            checked: false
          },
          {
            value: 'restangular#~1.4.0',
            name: 'restangular#~1.4.0',
            checked: true
          }
        ]
      },
      // stableVersions
      {
        type: 'list',
        name: 'ionicSass',
        message: 'Do you want to use the sass version of ionic\'s css?',
        choices: [
          {
            value: true,
            name: 'yes (more flexible)',
            default: true
          },
          {
            value: false,
            name: 'not (faster)',
          }
        ]
      },
      // stableVersions
      {
        type: 'list',
        name: 'stableVersions',
        message: 'Do you want to use components (bower & npm) we deem stable or the latest ones?',
        choices: [
          {
            value: true,
            name: 'stable (recommended)',
            default: true
          },
          {
            value: false,
            name: 'latest (experienced)',
          }
        ]
      },
      // select platforms
      {
        type: 'checkbox',
        name: 'platforms',
        message: 'Select all platforms you want to support:',
        choices: [
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
        ]
      },
      // select plugins
      {
        type: 'checkbox',
        name: 'plugins',
        message: 'Select all cordova plugins you want to install',
        choices: [
          new yeoman.inquirer.Separator(),
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
            value: 'org.apache.cordova.network-information',
            name: 'Network - org.apache.cordova.network-information'
          },
          {
            value: 'org.apache.cordova.splashscreen',
            name: 'Splashscreen - org.apache.cordova.splashscreen'
          },
          {
            value: 'https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin.git',
            name: 'Toast - https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin.git'
          },
          {
            value: 'org.apache.cordova.vibration',
            name: 'Vibration - org.apache.cordova.vibration'
          },
        ]
      },
    ];

    // prompt and save results in this.answers
    yeoman.inquirer.prompt(prompts, function (answers) {
      this.answers = answers;
      answers.includeSass = true; // set to true for now

      done();
    }.bind(this));
  },

  configuring: function () {

    // TODO: remove debugging
    // debugging
    this.log(chalk.inverse(JSON.stringify(this.answers, null, '  ')));
    this.answers = {
      'appName': 'asdf',
      'appId': 'com.company.project',
      'bowerPackages': [
        'angular-dynamic-locale#~0.1.17',
        'angular-localForage#~0.2.10',
        'angular-touch#~1.2.25',
        'angular-translate#~2.4.0',
        'angular-translate-loader-static-files#~2.4.0',
        'angular-ui-bootstrap-bower#~0.11.0',
        'fastclick#~1.0.3',
        'restangular#~1.4.0'
      ],
      'ionicSass': true,
      'stableVersions': true,
      'platforms': [
        'ios',
        'android'
      ],
      'plugins': [
        'org.apache.cordova.device',
        'org.apache.cordova.dialogs'
      ],
      'includeSass': true
    };

    // store config in .yo-rc.json
    this.config.set('answers', this.answers);
  },

  writing: {

    cordova: function () {
      var done = this.async(); // wait with subsequent tasks since cordova needs an empty folder
      // cordova project
      cordova.create('.', this.answers.appId, this.answers.appName)
      // add platforms
      .then(function () {
        this.log(chalk.green('Created cordova project'));
        return cordova.platform('add', this.answers.platforms);
      }.bind(this))
      // add plugins
      .then(function () {
        this.log(chalk.green('Added platforms: ' + this.answers.platforms.join(', ')));
        return cordova.plugins('add', this.answers.plugins);
      }.bind(this))
      // all
      .then(function () {
        this.log(chalk.green('Added plugins: ' + this.answers.plugins.join(', ')));
        this.log(chalk.green('Cordova project was set up successfully! Project Name: '), chalk.bgGreen(this.answers.appId));
        done();
      }.bind(this))
      .catch(function (err) {
        this.log(chalk.red('Couldn\'t finish generator: \n' + err));
        // halts because done will not be called!
      }.bind(this));
    },

    app: function () {

      // prepare bower.json
      var bower = this.bower = {
        dependencies: {
          'ionic': 'v1.0.0-beta.12',
          'angular': '~1.3.0-rc.2',
          'angular-ui-router': '~0.2.10',
          'ngCordova': '~0.1.4-alpha',
          'cordova': '~3.4.0'
        },
        devDependencies: {

        },
        resolutions: {
          'angular': '~1.3.0-rc.2'
        }
      };
      // include selected packages
      for (var i = 0, bowerPackage; (bowerPackage = this.answers.bowerPackages[i]); i++) {
        bowerPackage = bowerPackage.split('#');
        this.bower.dependencies[bowerPackage[0]] = bowerPackage[1];
      }
      // set all deps to latest?
      if (!this.answers.stableVersions) {
        for (var topKey in bower) {
          for (var key in bower[topKey]) {
            bower[topKey][key] = 'latest';
          }
        }
      }
      // add other properties
      bower.name = this.answers.appName;
      bower.private = true;

      // prepare index
      var indexFile = this.readFileAsString(path.join(this.sourceRoot(), '_index.html'));
      indexFile = this.engine(indexFile, this); // create template with data from 'this'

      // app  files
      this.copy('_app.js', 'app/scripts/app.js');
      this.write('bower.json', JSON.stringify(bower, null, 2));
      this.template('_gulpfile.js', 'gulpfile.js');
      this.write('app/index.html', indexFile);

      var css = 'main.' + (this.answers.includeSass ? 's' : '') + 'css';
      this.copy(css, 'app/styles/' + css);
    },

    projectfiles: function () {

      this.template('_package.json', 'package.json');
      this.copy('bowerrc', '.bowerrc');
      this.copy('editorconfig', '.editorconfig');
      this.copy('gitattributes', '.gitattributes');
      this.copy('gitignore', '.gitignore');
      this.copy('jscsrc', '.jscsrc');
      this.copy('jshintrc', '.jshintrc');
      this.copy('jshintignore', '.jshintignore');
      this.copy('jshintrc', '.jshintrc');
      this.copy('README.md', 'README.md');
    },

    subgenerators: function () {
      this.composeWith('gulp-ionic:angular-service', {arguments: 'start', options: {sample: 'start'}});
      this.composeWith('gulp-ionic:angular-controller', {arguments: 'start', options: {sample: 'start'}});
      this.composeWith('gulp-ionic:angular-partial', {arguments: 'start', options: {sample: 'start'}});
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install'],
      callback: function () {
        if (!this.options['skip-install']) {
          // inject bower dependencies and app js files
          var done = this.async();
          this.spawnCommand('gulp', ['wiredep', 'fonts'])
          .on('exit', function () {
            // TODO: better gulp task wiring/dependencies
            // https://github.com/gulpjs/gulp/blob/master/docs/API.md#async-task-support
            // https://github.com/klei/gulp-inject#injecting-files-from-multiple-source-streams
            // https://github.com/klei/gulp-inject#injecting-some-files-into-head-and-some-into-body
            this.spawnCommand('gulp', ['inject']);
            done();
          }.bind(this));
        }
      }.bind(this)
    });
  },

  end: function () {

  }
});

module.exports = GulpIonicGenerator;
