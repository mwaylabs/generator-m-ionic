/* jshint -W079 */ // prevent redefinition of $ warning

'use strict';
// gulp
var gulp = require('gulp');
var paths = gulp.paths;
// plugins
var $ = require('gulp-load-plugins')();
// modules
var del = require('del');

gulp.task('build', ['clean', 'jshint', 'jscs', 'build-app', 'partials', 'images', 'fonts'], function () {
  return gulp.src(paths.dist + '/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('clean', function () {
  del.sync(['.tmp', paths.dist + '/*']);
});
// build starting from main html file (index.html)
gulp.task('build-app', ['inject', 'styles'], function () {
  // useref - parses build block in html, concatenate & replace files
  // only builds files that are actually used
  var assets = $.useref.assets({searchPath: '{.tmp,app}'});

  return gulp.src('app/index.html') // main html file
    .pipe(assets)
    // TODO: implement flag to turn on
    // .pipe($.if('*.js', // angular DI & uglification
    //   $.ngAnnotate({
    //     remove: true,
    //     add: true,
    //     'single_quotes': true
    //   })
    //   .pipe($.uglify())
    // ))
    // .pipe($.if('*.css', $.csso())) // minify css
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe(gulp.dest(paths.dist));
});
// copy partials
gulp.task('partials', function () {
  return gulp.src([
    'app/partials/**/*', // html, language, locales, assets
  ])
  .pipe(gulp.dest(paths.dist + '/partials'));
});
// copy & minify images to dist/images
gulp.task('images', function () {
  return gulp.src('app/images/**/*')
    // disabled: imagemin not working correctly - https://github.com/mwaylabs/generator-m/issues/90
    // .pipe($.cache($.imagemin({
    //   progressive: true,
    //   interlaced: true
    // })))
    .pipe(gulp.dest(paths.dist + '/images'));
});
