/* jshint -W079 */ // prevent redefinition of $ warning

'use strict';
// gulp
var gulp = require('gulp');
var paths = gulp.paths;
// plugins
var $ = require('gulp-load-plugins')();
// modules
var wiredep = require('wiredep');
var mainBowerFiles = require('main-bower-files');

// inject app/**/.*js and cordova.js files into index.html
gulp.task('inject', function () {
  var jsFiles = gulp.src(paths.jsFiles);

  return gulp.src('./app/index.html')
    .pipe($.inject(
      jsFiles
        .pipe($.plumber()) // use plumber so watch doesn't crash on js error
        .pipe($.angularFilesort()),
      {relative: true}))
    .pipe(gulp.dest('./app'));
});

// inject bower components
gulp.task('wiredep', function () {
// TODO:
//   gulp.src('app/styles/*.scss') // into main.scss
//     .pipe(wiredep())
//     .pipe(gulp.dest('app/styles'));
  return gulp.src('app/*.html') // into index.html
    .pipe(wiredep.stream({exclude: ['bower_components/ionic/release/css']}))
       // exclude ionic scss since we're using ionic sass
    .pipe(gulp.dest('app'));
});

// copy fonts to do dist/fonts and app/fonts
gulp.task('fonts', function () {
  return gulp.src(mainBowerFiles({filter: /\.(eot|svg|ttf|woff)/i})
    .concat('app/main/assets/fonts/**/*'))
    .pipe($.flatten())
    .pipe(gulp.dest(paths.dist + '/fonts'))
    .pipe(gulp.dest('app/main/assets/fonts')); // TODO: find a better way to inject $ionicons-font-path: "../fonts" !default; into main.scss on build
});
