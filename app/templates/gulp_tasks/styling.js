/* jshint -W079 */ // prevent redefinition of $ warning

'use strict';
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

// build styles to tmp
gulp.task('styles', function () {
  return gulp.src('app/**/styles/main.scss')
    .pipe($.plumber())
    .pipe($.rubySass({
      style: 'expanded',
      precision: 10
    }))
    .pipe($.autoprefixer({ browsers: ['last 2 version'], remove: false}))
    .pipe(gulp.dest('.tmp/'));
});
