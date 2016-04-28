'use strict';
// gulp
var gulp = require('gulp');
var options = gulp.options;
// node core
var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;
// other
var yeomanTest = require('yeoman-test');
var chalk = require('chalk');
var answers = require('../.yo-rc.json')['generator-m-ionic'].answers;

var help = {
  projectDir: (function () {
    var projectDir = process.cwd().split('/');
    projectDir = projectDir[projectDir.length - 1];

    return projectDir;
  })(),

  projectDirVersion: function (version) {
    return this.projectDir + '@' + version;
  },

  getDirectoryDirs: function (dirPath) {
    return fs.readdirSync(dirPath)
    .filter(function (file) {
      return fs.statSync(path.join(dirPath, file)).isDirectory();
    })
    .map(function (dir) {
      return path.resolve(dirPath, dir);
    });
  },

  updateWithYo: function (version, cb) {
    this.install(version, function () {
      // execute generator
      var generatorBase = '../' + this.projectDir + '/node_modules/generator-m-ionic';
      var generatorGenerators = generatorBase + '/generators';
      console.log(chalk.green('running: ') + require('../' + generatorBase + '/package.json').version);

      var ctx = yeomanTest.run(path.resolve(generatorGenerators + '/app'));
      ctx.settings.tmpdir = false; // don't run in tempdir
      ctx
      .withGenerators(this.getDirectoryDirs(generatorGenerators))
      .withOptions({ // execute with options
        'skip-install': true, // don't need to install deps
        'skip-sdk': true, // for some reason won't install cordova properly, so just leave it
        'force': true
      })
      .withPrompts(answers) // answer prompts
      .on('end', function () {
        // uninstall
        this.uninstall(version, cb);
      }.bind(this));
    }.bind(this));
  },

  uninstall: function (version, cb) {
    process.chdir('../' + this.projectDir);
    console.log(chalk.green('uninstalling: ') + version + ' ' + process.cwd());
    exec('npm uninstall generator-m-ionic', function (error) {
      if (error) {
        console.log(chalk.red('error: ') + 'uninstalling ' + version + '\n', error);
      }
      cb();
    });
  },

  install: function (version, cb) {
    console.log(chalk.green('installing: ') + version + ' to ' + process.cwd());
    exec('npm i generator-m-ionic@' + version, function (error) {
      if (error) {
        console.log(chalk.red('error: ') + 'installing ' + version + '\n', error);
      }
      cb();
    });
  }
};

gulp.task('experimental-update', [], function (done) {
  if (!options.to) {
    console.log(chalk.red('error: ') + 'supply proper generator version with --to');
    return;
  }

  help.updateWithYo(options.to, function () {
    done();
  });
});
