/* jshint -W079 */ // prevent redefinition of $ warning

'use strict';
// gulp
var gulp = require('gulp');
var paths = gulp.paths;
// plugins
var $ = require('gulp-load-plugins')();

// all linting tasks
gulp.task('linting', ['jshint', 'jscs', 'jsonlint']);
gulp.task('linting-throw', ['jshint-throw', 'jscs-throw', 'jsonlint-throw']);

// check for jshint errors
var jshint = function (fail) {
  return function () {
    return gulp.src(paths.jsFiles)
      .pipe($.jshint())
      .pipe($.jshint.reporter('jshint-stylish'))
      .pipe($.if(fail, $.jshint.reporter('fail')));
  };
};
gulp.task('jshint', jshint());
gulp.task('jshint-throw', jshint(true));

// check for jscs errors
var jscs = function () {
  return function () {
    return gulp.src(paths.jsFiles)
      .pipe($.jscs());
  };
};
gulp.task('jscs', jscs());
gulp.task('jscs-throw', jscs(true));

// check for jsonlint errors
var jsonlint = function (fail) {
  var failReporter = function (file) {
    throw new Error(file.path + '\n' + file.jsonlint.message);
  };
  return function () {
    return gulp.src(paths.jsonFiles)
      .pipe($.jsonlint())
      .pipe($.jsonlint.reporter(fail ? failReporter : undefined));
  };
};
gulp.task('jsonlint', jsonlint());
gulp.task('jsonlint-throw', jsonlint(true));
