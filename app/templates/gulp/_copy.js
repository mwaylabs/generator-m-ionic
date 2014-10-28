/**
 * Created by pascalbrewing on 28/10/14.
 */
'use strict';
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('copy:font', function () {
  var del = require('del');
  del([ 'www/fonts' ], function (err) {
    gulp.src('app/fonts/**')
      .pipe($.plumber())
      .pipe(gulp.dest('www/fonts'))
      .pipe($.size());
  });
});
