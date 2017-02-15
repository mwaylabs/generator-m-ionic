'use strict';

var path = require('path');
var Generator = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var cordova = require('cordova-lib').cordova.raw; // get the promise version of all methods
var fs = require('fs');

// local modules
var utils = require('../../utils/utils.js');
var config = require('../../utils/config.js');
var bowerConfig = require('./sources/bower-config.js');
var prompts = require('./sources/prompts.js');
var sampleAnswers = require('./sources/sample-answers.js');

module.exports = Generator.extend({

  initializing: function () {
    // get package.json content
    this.pkg = require('../../package.json');
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
        'Welcome to the polished Generator-M-Ionic! v.' + this.pkg.version
      ));
    }

    // Set appName when generator was called with `--appName=HelloApp`
    if (this.options['app-name']) {
      this.appName = this.options['app-name'];
    }

    // prompt and save results in this.answers
    if (!this.options['skip-prompts']) {
      // tell yeoman we're doing asynchronous stuff here
      // so it can wait with subsequent tasks

      return this.prompt(prompts.main)
      .then(function (answers) { // prompt
        this.answers = answers;
      }.bind(this));
    }
  },

  configuring: function () {

    // debugging
    if (this.options['skip-prompts']) {
      this.answers = sampleAnswers.getStandard({
        'ios-only': this.options['ios-only'],
        'android-only': this.options['android-only'],
        'cordova': this.options.cordova,
        'ionic-cloud': this.options['ionic-cloud']
      });
      this.log(chalk.inverse(JSON.stringify(this.answers, null, '  ')));
    }

    // manipulate answers
    if (this.appName) { // save when name was provided in app-name option
      this.answers.appName = this.appName;
    }
    // save appModule in answers
    this.answers.appModule = utils.moduleName(this.answers.appName);
  },

  writing: {
    subgenerators: function () {
      // create main module
      this.composeWith('m-ionic:module', {
        arguments: config.DEFAULT_MODULE,
        mainModule: true,
        ionicCss: this.answers.ionicCss,
        'skip-prompts': this.options['skip-prompts']
      });
    },

    cordova: function () {
      if (this.update) {
        return true;
      }

      // cordova project
      var promise = cordova.create('.', this.answers.appId, this.answers.appName, this.answers.appName)
      // add platforms and save to config.xml
      .then(function () {
        this.log(chalk.green('Created cordova project'));
        if (this.options['skip-sdk'] || !this.answers.platforms.length) {
          return true;
        }
        else {
          return cordova.platform('add', this.answers.platforms, { save: true });
        }
      }.bind(this))
      // add plugins and save to config.xml
      .then(function () {
        this.log(chalk.green('Added platforms: ' + this.answers.platforms.join(', ')));
        if (this.options['skip-sdk'] || !this.answers.plugins.length) {
          return true;
        }
        else {
          return cordova.plugin('add', this.answers.plugins, { save: true });
        }
      }.bind(this))
      // all
      .then(function () {
        this.log(chalk.green('Added plugins: ' + this.answers.plugins.join(', ')));
        this.log(chalk.green('Cordova project was set up successfully! Project Name: '), chalk.bgGreen(this.answers.appName));
      }.bind(this))
      .catch(function (err) {
        this.log(chalk.red('Couldn\'t finish generator: \n' + err));
        process.exit(1);
      }.bind(this));

      // since cordova needs empty folder to work, return promise so yeoman waits before creating files
      return promise;
    },

    app: function () {
      // prepare bower.json
      var bowerJSON = bowerConfig.bowerJSON;
      // include selected packages
      for (var i = 0, bowerPackage; ((bowerPackage = this.answers.bowerPackages[i])); i++) {
        bowerPackage = bowerPackage.split('#');
        bowerJSON.dependencies[bowerPackage[0]] = bowerPackage[1];
      }

      // add other properties
      bowerJSON.name = utils.appBowerName(this.answers.appName);
      bowerJSON.private = true;

      // dependencies
      this.fs.write(
        this.destinationPath('bower.json'),
        JSON.stringify(bowerJSON, null, 2)
      );
      this.fs.copy(
        this.templatePath('package.json'),
        this.destinationPath('package.json')
      );

      // app files
      // add random color to navbar
      var templateVars = {
        answers: this.answers,
        barColor: this.barColor
      };
      this.barColor = utils.barColor();
      this.fs.copyTpl(
        this.templatePath('_index.html'),
        this.destinationPath('app/index.html'),
        templateVars
      );
      this.fs.copyTpl(
        this.templatePath('_app.js'),
        this.destinationPath('app/app.js'),
        templateVars
      );

      // other files
      this.fs.copy(
        this.templatePath('hooks/**'),
        this.destinationPath('hooks/')
      );
      this.fs.copy(
        this.templatePath('gulpfile.js'),
        this.destinationPath('gulpfile.js')
      );
      this.fs.copyTpl(
        this.templatePath('gulp/_injecting.js'),
        this.destinationPath('gulp/injecting.js'),
        templateVars
      );
      this.fs.copy(
        this.templatePath('gulp/**/!(_*)'),
        this.destinationPath('gulp/')
      );
      this.fs.copy(
        this.templatePath('jenkins.sh'),
        this.destinationPath('jenkins.sh')
      );
      this.fs.copy(
        this.templatePath('karma.conf.js'),
        this.destinationPath('karma.conf.js')
      );
      this.fs.copy(
        this.templatePath('protractor.conf.js'),
        this.destinationPath('protractor.conf.js')
      );
      this.fs.copy(
        this.templatePath('res/**'),
        this.destinationPath('res/')
      );
      this.fs.copy(
        this.templatePath('test/karma/.eslintrc'),
        this.destinationPath('test/karma/.eslintrc')
      );
      this.fs.copy(
        this.templatePath('test/protractor/.eslintrc'),
        this.destinationPath('test/protractor/.eslintrc')
      );

      // dot files
      this.fs.copyTpl(
        this.templatePath('_eslintrc_app'),
        this.destinationPath('app/.eslintrc'),
        templateVars
      );
      this.fs.copy(
        this.templatePath('bowerrc'),
        this.destinationPath('.bowerrc')
      );
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('eslintrc'),
        this.destinationPath('.eslintrc')
      );
      this.fs.copy(
        this.templatePath('eslintignore'),
        this.destinationPath('.eslintignore')
      );
      this.fs.copy(
        this.templatePath('gitattributes'),
        this.destinationPath('.gitattributes')
      );
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );
      this.fs.copy(
        this.templatePath('.travis.yml'),
        this.destinationPath('.travis.yml')
      );

      // inject project name, version and info into readme
      var readme = this.fs.read(path.join(__dirname, '../../', 'README.md'));
      readme = readme.replace(/^# Generator-M-Ionic/, '# ' + this.answers.appName + '\nThis project was generated with Generator-M-Ionic v' + this.pkg.version + '. For more info visit the [repository](https://github.com/mwaylabs/generator-m-ionic) or check out the README below.\n\n# Generator-M-Ionic v' + this.pkg.version);
      this.fs.write(this.destinationPath('README.md'), readme);
    },

    morePrompts: function () {
      if (!this.options['skip-prompts']) {
        // ecosystem prompts
        return this.prompt(prompts.ecosystems)
        .then(answers => { // prompt
          this.answers.ecosystems = answers.ecosystems;
          // yarn/npm prompt
          return this.prompt(prompts.install);
        })
        .then(answers => {
          this.answers.install = answers.install;
        });
      }
    },

    ecosystemIntegration: function () {
      // store answers in .yo-rc.json, all questions now asked
      this.config.set('answers', this.answers);

      if (this.answers.ecosystems.indexOf('greenhouse') > -1) {
        this.composeWith('m-ionic:greenhouse');
      }
      if (this.answers.ecosystems.indexOf('appmobi') > -1) {
        this.composeWith(require.resolve('generator-appmobi/generators/app/index.js'), {
          'skip-sdk': this.options['skip-sdk']
        });
      }
      if (this.answers.ecosystems.indexOf('ionic-cloud') > -1) {
        this.composeWith('m-ionic:ionic-cloud');
      }
      if (this.answers.ecosystems.indexOf('apiomat') > -1) {
        // do nothing: apiomat can only be done after project setup
      }
    }
  },


  install: function () {
    let installConf = {
      bower: true,
      skipInstall: this.options['skip-install']
    };
    // install via yarn or npm according to prompts
    installConf[this.answers.install] = true;
    // unset default npm install
    if (this.answers.install === 'yarn') {
      installConf.npm = false;
    }
    // insall npm, bower and save plugins/platforms
    this.installDependencies(installConf);
  },

  end: function () {
    this.log(yosay(
      'All done! To get going run:\n' +
      chalk.green('gulp watch \n') +
      'More info: http://bit.ly/1DXy7MJ'
    ));
  }
});
