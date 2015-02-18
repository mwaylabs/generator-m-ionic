/* jshint -W079 */ // prevent redefinition of $ warning

'use strict';
// gulp
var gulp = require('gulp');
var options = gulp.options;
// plugins
var $ = require('gulp-load-plugins')();

var runCordova = function () {
  return gulp.src('')
    .pipe($.shell([
      'node_modules/cordova/bin/cordova ' + options.cordova
    ]));
};

gulp.task('cordova', runCordova);
gulp.task('cordova-with-build', ['build'], runCordova);
