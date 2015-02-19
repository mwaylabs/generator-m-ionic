// generated on 2015-01-12 using generator-m 0.2.7
/* jshint -W079 */ // prevent redefinition of $ warning

'use strict';
var gulp = require('gulp');
// config
gulp.paths = {
  dist: 'www',
  jsFiles: ['app/**/*.js', '!app/bower_components/**/*.js'],
  jsonFiles: ['app/**/*.json', '!app/bower_components/**/*.json']
};
// retrieve options
var minimist = require('minimist');
var options = gulp.options = minimist(process.argv.slice(2));
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
// environment
options.env = options.env || 'dev';

// load tasks
var requireDir = require('require-dir');
requireDir('./gulp_tasks');

// MAIN TASKS
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
