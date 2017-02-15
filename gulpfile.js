'use strict';

// tasks based on : https://github.com/youngmountain/generator-node-gulp/blob/master/gulpfile.js
var path = require('path');
var gulp = require('gulp');
var nsp = require('gulp-nsp');
var $ = require('gulp-load-plugins')();

// ADD PATHS AUTOMATICALLY
var paths = {
  coverage: [ // code actually run by the generator
    'generators/*/index.js',
    'utils/**/*.js'
  ],
  lint: [ // code to lint
    './gulpfile.js',
    'generators/*/index.js',
    'generators/*/templates/**/!(_)*.js',
    'utils/**/*.js',
  ],
  watch: [ // code that should be watched
    './gulpfile.js',
    'generators/**/*',
    'utils/**/*'
  ],
  test: [
    './test/**/*.js',
    '!./test/temp/**/*.js'
  ],
  extra: [
    'generators/app/sources/**/*.js',
  ]
};

// add extra files
paths.coverage = paths.coverage.concat(paths.extra);
paths.lint = paths.lint.concat(paths.extra);
paths.watch = paths.watch.concat(paths.extra);
// add test files
paths.lint = paths.lint.concat(paths.test);
paths.watch = paths.watch.concat(paths.test);

// when running in CI environment (Travis), abort and throw error on error
var plumberConf = {};
if (process.env.CI) {
  plumberConf.errorHandler = function (err) {
    throw err;
  };
}

gulp.task('nsp', function (cb) {
  nsp({package: path.resolve('package.json')}, cb);
});

// will run istanbul & lint while you develop
gulp.task('watch', ['lint', 'istanbul'], function () {
  gulp.watch(paths.watch, ['lint', 'istanbul']);
});

// will run coding style checks
gulp.task('lint', ['istanbul'], function () {
  return gulp.src(paths.lint)
    .pipe($.plumber(plumberConf))
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failOnError());
});

// will run mocha and print reports
gulp.task('istanbul', function (cb) {
  gulp.src(paths.coverage)
    .pipe($.istanbul()) // Covering files
    .pipe($.istanbul.hookRequire())
    .on('finish', function () {
      gulp.src(paths.test, {cwd: __dirname})
        .pipe($.plumber(plumberConf))
        .pipe($.mocha())
        .pipe($.istanbul.writeReports()) // Creating the reports after tests ran
        .on('finish', function () {
          process.chdir(__dirname);
          cb();
        });
    });
});


gulp.task('test', ['lint', 'istanbul']);

gulp.task('prepublish', ['nsp']);
gulp.task('default', ['test']);
