/* jshint -W079 */ // prevent redefinition of $ warning

'use strict';
var gulp = require('gulp');
// load plugins
var $ = require('gulp-load-plugins')();

// check for jshint errors
gulp.task('jshint', function () {
  return gulp.src('app/scripts/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
});

// check for jscs errors
gulp.task('jscs', function () {
  return gulp.src('app/scripts/**/*.js')
    .pipe($.jscs());
});
