/* jshint -W079 */ // prevent redefinition of $ warning
'use strict';

var gulp   = require('gulp');
var $ = require('gulp-load-plugins')();

var paths = {
  lint: ['./gulpfile.js', './app/index.js', './controller/index.js', './service/index.js', './partial/index.js'],
  tests: ['./test/**/*.js', '!./test/temp/**/*.js'],
  watch: ['./gulpfile.js', './app/**', './test/**/*.js'],
  source: []
};
paths.watch = paths.watch.concat(paths.lint);
paths.source = paths.source.concat(paths.lint);

var onError = function (err) {
  $.util.beep();

  if (process.env.CI) {
    throw new Error(err);
  }
};

// will run coding style checks
gulp.task('lint', function () {
  return gulp.src(paths.lint)
    .pipe($.jshint('.jshintrc'))
    .pipe($.plumber({
      errorHandler: onError
    }))
    .pipe($.jscs())
    .pipe($.jshint.reporter('jshint-stylish'));
});

// will run mocha and print reports
gulp.task('istanbul', function (cb) {
  gulp.src(paths.source)
    .pipe($.istanbul()) // Covering files
    .on('finish', function () {
      gulp.src(paths.tests, {cwd: __dirname})
        .pipe($.plumber({
          errorHandler: onError
        }))
        .pipe($.mocha())
        .pipe($.istanbul.writeReports()) // Creating the reports after tests runned
        .on('finish', function () {
          process.chdir(__dirname);
          cb();
        });
    });
});

// bump your version
gulp.task('bump', ['test'], function () {
  var bumpType = $.util.env.type || 'patch'; // major.minor.patch

  return gulp.src(['./package.json'])
    .pipe($.bump({ type: bumpType }))
    .pipe(gulp.dest('./'));
});

// will run istanbul while you develop
gulp.task('watch', ['istanbul'], function () {
  gulp.watch(paths.watch, ['istanbul']);
});

gulp.task('test', ['lint', 'istanbul']);

gulp.task('release', ['bump']);

gulp.task('default', ['test']);
