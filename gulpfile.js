/* jshint -W079 */ // prevent redefinition of $ warning
'use strict';

// tasks based on : https://github.com/youngmountain/generator-node-gulp/blob/master/gulpfile.js

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var packageJSON = require('./package.json');

// ADD PATHS AUTOMATICALLY
var paths = {
  coverage: [ // code actually run by the generator
  ],
  lint: [ // code to lint
    './gulpfile.js',
  ],
  watch: [ // code that should be watched
    './gulpfile.js',
  ],
  test: [
    './test/**/*.js',
    '!./test/temp/**/*.js'
  ],
  extra: [
    'app/sources/**/*.js',
    'utils/**/*.js'
  ]
};
// package.json files
for (var i = 0, folder; (folder = packageJSON.files[i]); i++) {
  // coverage: add every generator's index.js
  paths.coverage.push('./' + folder + '/index.js');
  // lint: index.js & add untemplated files
  paths.lint.push('./' + folder + '/templates/**/*.js');
  paths.lint.push('!./' + folder + '/templates/**/_*.js');
  // watch: add all files in folders
  paths.watch.push('./' + folder + '/**/*');
}
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

// will run istanbul & lint while you develop
gulp.task('watch', ['lint', 'istanbul'], function () {
  gulp.watch(paths.watch, ['lint', 'istanbul']);
});

// will run coding style checks
gulp.task('lint', ['istanbul'], function () {
  return gulp.src(paths.lint)
    .pipe($.jshint('.jshintrc'))
    .pipe($.plumber(plumberConf))
    .pipe($.jscs())
    .pipe($.jshint.reporter('jshint-stylish'));
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

gulp.task('release', ['bump']);

// bump your version
gulp.task('bump', ['test'], function () {
  var bumpType = $.util.env.type || 'patch'; // major.minor.patch

  return gulp.src(['./package.json'])
    .pipe($.bump({ type: bumpType }))
    .pipe(gulp.dest('./'));
});

gulp.task('test', ['lint', 'istanbul']);

gulp.task('default', ['test']);
