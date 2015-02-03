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

// inject app/**/*.js and bower components into index.html
gulp.task('inject', ['wiredep'], function () {
  return gulp.start('inject-only');
});

// inject js and compiled css files into index.html
gulp.task('inject-only', function () {

  return gulp.src('app/index.html')
    .pipe($.inject( // app/**/*.js files
      gulp.src(paths.jsFiles)
        .pipe($.plumber()) // use plumber so watch doesn't crash on js error
        .pipe($.angularFilesort()),
      {relative: true}))
    .pipe($.inject( // inject compiled css
      gulp.src('app/*/styles/main.scss', {read: false}),
      {
        ignorePath: 'app',
        relative: true,
        transform: function (filePath) {
          console.log(filePath);
          return '<link rel="stylesheet" href="' +
            filePath.replace(/scss$/, 'css') + // replace file extension
            '">';
        }
      }))
    .pipe(gulp.dest('app'));
});

// inject bower components
gulp.task('wiredep', function () {
// TODO:
//   gulp.src('app/styles/*.scss') // into main.scss
//     .pipe(wiredep())
//     .pipe(gulp.dest('app/styles'));
  return gulp.src('app/index.html') // into index.html
    .pipe(wiredep.stream({exclude: ['bower_components/ionic/release/css']}))
       // exclude ionic scss since we're using ionic sass
    .pipe(gulp.dest('app'));
});

// copy bower-fonts to do app/main/assets/fonts
gulp.task('bower-fonts', function () {
  var fontFiles = mainBowerFiles({filter: /\.(eot|svg|ttf|woff)/i})
    .concat('app/main/assets/fonts/**/*');
  return gulp.src(fontFiles)
    .pipe($.flatten())
    .pipe(gulp.dest('app/main/assets/fonts')); // TODO: find a better way to inject $ionicons-font-path: "../fonts" !default; into main.scss on build
});
