/**
 * Created by pascal on 23.07.14.
 */
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('doc', [], function () {
  return gulp.src(['app/**/*.js','!app/bower_components/**'])
    .pipe($.plumber())
    .pipe($.ngdocs.process())
    .pipe(gulp.dest('doc'));
});
