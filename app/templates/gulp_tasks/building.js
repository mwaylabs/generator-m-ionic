/* jshint -W079 */ // prevent redefinition of $ warning

'use strict';
// gulp
var gulp = require('gulp');
var paths = gulp.paths;
// plugins
var $ = require('gulp-load-plugins')();
// modules
var del = require('del');
var vinylPaths = require('vinyl-paths');

gulp.task('build', ['linting-throw', 'build-app', 'build-templates', 'build-assets'], function () {
  return gulp.src(paths.dist + '/**/*')
    .pipe($.size({title: 'build', gzip: true}));
});

gulp.task('clean', function () {
  return gulp.src(['.tmp', paths.dist + '/*'])
    .pipe(vinylPaths(del));
});

// concatenate files in build:blocks inside index.html
// and copy to build folder destinations
gulp.task('build-app', ['clean', 'inject-all'], function () {
  var assets = $.useref.assets({searchPath: '{.tmp,app}'});

  return gulp.src('app/index.html') // main html file
    .pipe(assets)
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe(gulp.dest(paths.dist));
});

// copy templates
gulp.task('build-templates', ['clean'], function () {
  return gulp.src([
    'app/**/templates/**/*',
  ])
  .pipe(gulp.dest(paths.dist));
});

// copy assets, wait for fonts
gulp.task('build-assets', ['clean', 'bower-fonts'], function () {
  return gulp.src('app/**/assets/**/*')
    .pipe(gulp.dest(paths.dist));
});
