/* jshint -W079 */ // prevent redefinition of $ warning

'use strict';
// gulp
var gulp = require('gulp');
var options = gulp.options;
// plugins
var $ = require('gulp-load-plugins')();
// packages
var path = require('path');

var runCordova = function (command, stream) {
  // allow to overwrite command from option.cordova with parameter
  command = typeof command === 'string' ? command : options.cordova;
  // create new stream if not provided
  stream = stream || gulp.src('');
  return stream
    .pipe($.shell([
      // needs explicit cross-platform path
      path.join('node_modules/cordova/bin/cordova ') + command
    ]));
};

gulp.task('cordova', runCordova);
gulp.task('cordova-with-build', ['build'], runCordova);
