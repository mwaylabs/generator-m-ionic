// generated on 2015-01-12 using generator-m 0.2.7
/* jshint -W079 */ // prevent redefinition of $ warning

'use strict';
var gulp = require('gulp');
var minimist = require('minimist');
var requireDir = require('require-dir');
var chalk = require('chalk');
var fs = require('fs');

// config
gulp.paths = {
  dist: 'www',
  jsFiles: ['app/**/*.js', '!app/bower_components/**/*.js'],
  jsonFiles: ['app/**/*.json', '!app/bower_components/**/*.json']
};

// OPTIONS
var options = gulp.options = minimist(process.argv.slice(2));

// set defaults
var task = options._[0]; // only for first task
var gulpSettings;
if (fs.existsSync('./gulp_tasks/.gulp_settings.json')) {
  gulpSettings = require('./gulp_tasks/.gulp_settings.json');
  var defaults = gulpSettings.defaults;
  if (defaults) {
    // defaults present for said task?
    if (task && task.length && defaults[task]) {
      var taskDefaults = defaults[task];
      // copy defaults to options object
      for (var key in taskDefaults) {
        // only if they haven't been explicitly set
        if (options[key] === undefined) {
          options[key] = taskDefaults[key];
        }
      }
    }
  }
}

// environment
options.env = options.env || 'dev';
// print options
if (defaults && defaults[task]) {
  console.log(chalk.green('defaults for task \'' + task + '\': '), defaults[task]);
}
// gulp build before running cordova?
if (options.cordova && options.build !== false) { // --no-build
  var cmds = ['build', 'run', 'emulate', 'prepare'];
  for (var i = 0, cmd; (cmd = cmds[i]); i++) {
    if (options.cordova.indexOf(cmd) >= 0) {
      options.runBuild = true;
      break;
    }
  }
}

// load tasks
requireDir('./gulp_tasks');

// default task
gulp.task('default', function () {
  // cordova with build
  if (options.runBuild) {
    return gulp.start('cordova-with-build');
  }
  // cordova without build
  else if (options.cordova) {
    return gulp.start('cordova');
  }
  // just watch when cordova option not present
  else {
    return gulp.start('watch');
  }
});
