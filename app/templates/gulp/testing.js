/* jshint -W079 */ // prevent redefinition of $ warning

'use strict';
// gulp
var gulp = require('gulp');
var path = require('path');
var paths = gulp.paths;
// plugins
var $ = require('gulp-load-plugins')();
// modules
var karma = require('karma');

function runKarma (singleRun, done) {
  karma.server.start({
    configFile: path.join(__dirname, '/../karma.conf.js'),
    singleRun: singleRun,
    autoWatch: !singleRun
  }, function () {
    done();
  });
}

gulp.task('karma', ['linting'], function (done) {
  runKarma(true, done);
});

gulp.task('karma:auto', ['linting'], function (done) {
  runKarma(false, done);
});

// Downloads the selenium webdriver
var webdriverUpdate = 'webdriver_update';
var webdriverStandalone = 'webdriver_standalone';
gulp.task('webdriver-update', $.protractor[webdriverUpdate]);
gulp.task('webdriver-standalone', $.protractor[webdriverStandalone]);

function runProtractor (done) {
  gulp.src(paths.protractor)
    .pipe($.protractor.protractor({
      configFile: 'protractor.conf.js'
    }))
    .on('error', function (err) {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    })
    .on('end', function () {
      done();
    });
}

gulp.task('protractor', ['serve-no-open', 'linting', 'webdriver-update'], runProtractor);
gulp.task('protractor-build', ['serve-build-no-open', 'linting', 'webdriver-update'], runProtractor);
