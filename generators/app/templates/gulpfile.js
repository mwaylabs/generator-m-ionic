'use strict';
var gulp = require('gulp');
var minimist = require('minimist');
var requireDir = require('require-dir');
var chalk = require('chalk');
var fs = require('fs');

// config
var paths = gulp.paths = {
  bowerComponents: 'app/bower_components',
  dist: 'www',
  jsFiles: ['app/**/*.js', '!app/bower_components/**/*.js'],
  jsonFiles: ['app/**/*.json', '!app/bower_components/**/*.json'],
  scssFiles: ['app/*/styles/**/*.scss'],
  cssFiles: ['.tmp/*/styles/*.css'],
  templates: ['app/*/templates/**/*'],
  contrib: ['gulpfile.js', 'gulp/**/*.js', 'hooks/**/*.js'],
  karma: ['test/karma/**/*.js'],
  protractor: ['test/protractor/**/*.js']
};
paths.watchFiles = paths.jsFiles
  .concat([
    'app/index.html',
    'app/*/assets/**/*'
  ])
  .concat(paths.templates);

// OPTIONS
var options = gulp.options = minimist(process.argv.slice(2));

// load .gulp_settings.json
var task = options._[0]; // only for first task
var gulpSettings;
if (fs.existsSync('./gulp/.gulp_settings.json')) {
  gulpSettings = require('./gulp/.gulp_settings.json');
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
// cordova command one of cordova's build commands?
if (options.cordova) {
  var cmds = ['build', 'run', 'emulate', 'prepare', 'serve'];
  for (var i = 0, cmd; ((cmd = cmds[i])); i++) {
    if (options.cordova.indexOf(cmd) >= 0) {
      options.cordovaBuild = true;
      break;
    }
  }
}

// load tasks
requireDir('./gulp');

// default task
gulp.task('default', function () {
  // cordova build command & gulp build
  if (options.cordovaBuild && options.build !== false) {
    return gulp.start('cordova-with-build');
  }
  // cordova build command & no gulp build
  else if (options.cordovaBuild && options.build === false) {
    return gulp.start('cordova-only-resources');
  }
  // cordova non-build command
  else if (options.cordova) {
    return gulp.start('cordova');
  }
  // livereload command
  else if (options.livereload) {
    options.build = false; // build not necessary, take whatever's in www
    return gulp.start('livereload');
  }
  // just watch when cordova option not present
  else {
    return gulp.start('watch');
  }
});
