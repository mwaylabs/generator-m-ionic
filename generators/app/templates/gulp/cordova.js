'use strict';
// gulp
var gulp = require('gulp');
var options = gulp.options;
// plugins
var $ = require('gulp-load-plugins')();
// packages
var path = require('path');
var del = require('del');
var vinylPaths = require('vinyl-paths');

var runCordova = function (command, stream) {
  // allow to overwrite command from option.cordova with parameter
  command = typeof command === 'string' ? command : options.cordova;
  // create new stream if not provided
  stream = stream || gulp.src('');
  return stream
    .pipe($.shell([
      // needs explicit cross-platform path
      path.join('node_modules/cordova/bin/cordova ') + command
    ]));
};

gulp.task('cordova', runCordova);
gulp.task('cordova-only-resources', ['resources'], runCordova);
gulp.task('cordova-with-build', ['build', 'resources'], runCordova);

// Handle resources
gulp.task('clean-res', function () {
  return gulp.src('res/*/current/*')
    .pipe(vinylPaths(del));
});

gulp.task('resources', ['clean-res'], function () {
  var setFolder = options.res || 'default';

  var resourceFiles = 'res/*/' + setFolder + '/**/*';
  return gulp.src(resourceFiles)
    .pipe($.rename(function (path) {
      path.dirname = path.dirname.replace('/' + setFolder, '/current');
    }))
    .pipe(gulp.dest('res'));
});
