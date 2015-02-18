/* jshint -W079 */ // prevent redefinition of $ warning

'use strict';
// gulp
var gulp = require('gulp');
var paths = gulp.paths;
// plugins
var $ = require('gulp-load-plugins')();

// all linting tasks
gulp.task('linting', ['jshint', 'jscs', 'jsonlint']);

// check for jshint errors
gulp.task('jshint', function () {
  return gulp.src(paths.jsFiles)
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
});

// check for jscs errors
gulp.task('jscs', function () {
  return gulp.src(paths.jsFiles)
    .pipe($.jscs());
});

gulp.task('jsonlint', function () {
  return gulp.src(paths.jsonFiles)
    .pipe($.jsonlint())
    .pipe($.jsonlint.reporter(function (file) {
      throw new Error(file.path + '\n' + file.jsonlint.message);
    }));
});
