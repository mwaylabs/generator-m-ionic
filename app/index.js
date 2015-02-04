'use strict';

var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var cordova = require('cordova-lib').cordova.raw; // get the promise version of all methods
var fs = require('fs');

// local modules
var utils = require('../utils/utils.js');
var config = require('../utils/config.js');
var bowerConfig = require('./sources/bower-config.js');
var cordovaConfig = require('./sources/cordova-config.js');
var sampleAnswers = require('./sources/sample-answers.js');

var MGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    // get package.json content
    this.pkg = require('../package.json');
    // non-empty dir?
    this.fileCount = fs.readdirSync('.').length;
    // read .yo-rc
    this.answers = this.config.getAll().answers;
    // is update?
    this.update = this.answers ? true : false;

    // abort when directory is not empty on first run
    if (!this.update && this.fileCount > 0) {
      this.log(chalk.red('Non-empty directory. Cordova needs an empty directory to set up project'));
      process.exit(1);
    }
  },

  prompting: function () {
    if (this.update) {
      return;
    }
    // say hello
    if (!this.options['skip-welcome-message']) { // for use with generator-m-server
      this.log(yosay(
        'Welcome to the polished M generator!'
      ));
    }

    // Set appName when generator was called with `--appName=HelloApp`
    if (this.options['app-name']) {
      this.appName = this.options['app-name'];
    }

    var prompts = [
      // appName
      {
        type: 'input',
        name: 'appName',
        message: 'state a name for your project (this name will be displayed below the app icon)',
        validate: function (value) {
          return value ? true : 'Please enter a name ';
        },
        when: function () {
          // Show this prompt only if appName is not already set
          return !this.appName;
        }.bind(this)
      },
      // appId
      {
        type: 'input',
        name: 'appId',
        message: 'state a bundle identifier for your project (e.g. com.company.project)',
        validate: function (value) {
          var pattern = /^[a-z][a-z0-9_]*(\.[a-z0-9_]+)+[0-9a-z_]$/i;
          return pattern.test(value) ? true : 'Please enter a valid bundle identifier! E.g. com.company.project';
        }
      },
      // bower packages
      {
        type: 'checkbox',
        name: 'bowerPackages',
        message: 'Choose all bower packages in addition to angular, ionic, angular-ui-router, cordova and ngCordova:',
        choices: bowerConfig.optional
      },
      // select platforms
      {
        type: 'checkbox',
        name: 'platforms',
        message: 'Select all platforms you want to support:',
        choices: cordovaConfig.platforms
      },
      // select plugins
      {
        type: 'checkbox',
        name: 'plugins',
        message: 'Select all cordova plugins you want to install',
        choices: cordovaConfig.plugins
      },
    ];

    // prompt and save results in this.answers
    if (!this.options['skip-prompts']) {
      // tell yeoman we're doing asynchronous stuff here
      // so it can wait with subsequent tasks
      var done = this.async();

      this.prompt(prompts, function (answers) { // prompt
        this.answers = answers;

        done();
      }.bind(this));
    }
  },

  configuring: function () {

    // debugging
    if (this.options['skip-prompts']) {
      this.answers = sampleAnswers.getStandard();
      this.log(chalk.inverse(JSON.stringify(this.answers, null, '  ')));
    }

    // manipulate answers
    if (this.appName) { // save when name was provided in app-name option
      this.answers.appName = this.appName;
    }
    // save appModule in answers
    this.answers.appModule = utils.textToCamel(this.answers.appName);

    // store answers in .yo-rc.json
    this.config.set('answers', this.answers);
  },

  writing: {

    cordova: function () {
      if (this.update) {
        return true;
      }

      var done = this.async(); // wait with subsequent tasks since cordova needs an empty folder
      // cordova project
      cordova.create('.', this.answers.appId, this.answers.appName)
      // add platforms
      .then(function () {
        this.log(chalk.green('Created cordova project'));
        return this.options['skip-sdk'] ? true : cordova.platform('add', this.answers.platforms);
      }.bind(this))
      // add plugins
      .then(function () {
        this.log(chalk.green('Added platforms: ' + this.answers.platforms.join(', ')));
        return this.options['skip-sdk'] ? true : cordova.plugins('add', this.answers.plugins);
      }.bind(this))
      // all
      .then(function () {
        this.log(chalk.green('Added plugins: ' + this.answers.plugins.join(', ')));
        this.log(chalk.green('Cordova project was set up successfully! Project Name: '), chalk.bgGreen(this.answers.appId));
        done();
      }.bind(this))
      .catch(function (err) {
        this.log(chalk.red('Couldn\'t finish generator: \n' + err));
        process.exit(1);
      }.bind(this));
    },

    app: function () {
      // prepare bower.json
      var bowerJSON = bowerConfig.bowerJSON;
      // include selected packages
      for (var i = 0, bowerPackage; (bowerPackage = this.answers.bowerPackages[i]); i++) {
        bowerPackage = bowerPackage.split('#');
        bowerJSON.dependencies[bowerPackage[0]] = bowerPackage[1];
      }

      // add other properties
      bowerJSON.name = this.answers.appName;
      bowerJSON.private = true;

      // dependencies
      this.write('bower.json', JSON.stringify(bowerJSON, null, 2));
      this.template('_package.json', 'package.json');

      // app files
      this.template('_index.html', 'app/index.html');
      this.template('_app.js', 'app/app.js');

      // other files
      this.template('_gulpfile.js', 'gulpfile.js');
      this.directory('gulp_tasks', 'gulp_tasks');
      this.copy('bowerrc', '.bowerrc');
      this.copy('editorconfig', '.editorconfig');
      this.copy('gitattributes', '.gitattributes');
      this.copy('gitignore', '.gitignore');
      this.copy('jenkins.sh', 'jenkins.sh');
      this.copy('jscsrc', '.jscsrc');
      this.copy('jshintrc', '.jshintrc');
      this.copy('jshintignore', '.jshintignore');
      this.copy(path.join(__dirname, '../', 'README.md'), 'README.md');
    },

    subgenerators: function () {
      this.composeWith('m:module', {
        arguments: config.DEFAULT_MODULE,
        options: {sample: 'start'}
      });
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  },
});

module.exports = MGenerator;
