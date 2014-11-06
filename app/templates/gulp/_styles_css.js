/**
 * Created by pascalbrewing on 22/10/14.
 */
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');

gulp.task('styles', [ 'wiredep', 'clean:styles' ], function () {
  return gulp.src('./app/styles/main.scss')
    .pipe($.plumber())
    .pipe($.autoprefixer('last 1 version'))
    .pipe(gulp.dest('.tmp/styles'))
    .pipe($.size());
});

gulp.task('clean:styles', function (cb) {
  del(['.tmp/styles'],cb);
});
