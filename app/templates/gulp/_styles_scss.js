/**
 * Created by pascalbrewing on 22/10/14.
 */
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');

gulp.task('styles', ['wiredep','clean:styles'],  function () {
  return gulp.src('./app/styles/main.scss')
    .pipe($.plumber())
    .pipe($.sass({style: 'expanded'}))
    .on('error', handleError)
    .pipe($.autoprefixer('last 1 version'))
    .pipe(gulp.dest('.tmp/styles'))
    .pipe($.size());
});

function handleError(err) {
  console.error(err.toString());
  this.emit('end');
}
gulp.task('clean:styles', function (cb) {
  del([
        '.tmp/styles'
      ], cb);
});
