'use strict';
// gulp
var gulp = require('gulp');
var paths = gulp.paths;
// plugins
var $ = require('gulp-load-plugins')();

// all linting tasks
gulp.task('linting', ['eslint', 'jsonlint']);
gulp.task('linting-throw', ['eslint-throw', 'jsonlint-throw']);

// check app and test for eslint errors
var eslint = function (fail) {
  return function () {
    return gulp.src(paths.jsFiles.concat(paths.karma).concat(paths.protractor))
      .pipe($.eslint())
      .pipe($.eslint.format())
      .pipe($.if(fail, $.eslint.failOnError()));
  };
};
gulp.task('eslint', eslint());
gulp.task('eslint-throw', eslint(true));

// check app for jsonlint errors
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

// eslint task for contributors
gulp.task('contrib-linting', ['linting'], function () {
  return gulp.src(paths.contrib)
    .pipe($.eslint())
    .pipe($.eslint.format());
});
