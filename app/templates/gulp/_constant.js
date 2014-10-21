'use strict';
var gulp = require('gulp');
var ngConstant = require('gulp-ng-constant');
gulp.task('config', function () {
  gulp.src('./config.json')
    .pipe(ngConstant())
    // Writes config.js to dist/ folder
    .pipe(gulp.dest('./app/scripts'));
});
