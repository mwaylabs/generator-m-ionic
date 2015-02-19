/* jshint -W079 */ // prevent redefinition of $ warning

'use strict';
// gulp
var gulp = require('gulp');
var paths = gulp.paths;
var options = gulp.options;
// plugins
var $ = require('gulp-load-plugins')();
// modules
var wiredep = require('wiredep');
var mainBowerFiles = require('main-bower-files');

// inject app/**/*.js, bower components, css into index.html
// inject environment variables into config.js constant
gulp.task('inject-all', ['styles', 'wiredep', 'bower-fonts', 'environment'], function () {

  return gulp.src('app/index.html')
    .pipe(
      $.inject( // app/**/*.js files
        gulp.src(paths.jsFiles)
          .pipe($.plumber()) // use plumber so watch can start despite js errors
          .pipe($.naturalSort())
          .pipe($.angularFilesort()),
        {relative: true}))
    .pipe(
      $.inject( // inject compiled css
        gulp.src('.tmp/*/styles/main.css', {read: false}),
        {
          ignorePath: '../.tmp',
          relative: true,
        }))
    .pipe(gulp.dest('app'));
});

// build styles to tmp
gulp.task('styles', function () {
  // compile css starting from each module's main.scss
  return gulp.src('app/**/styles/main.scss')
    .pipe($.plumber())
    .pipe($.rubySass({
      style: 'expanded',
      precision: 10
    }))
    .pipe($.autoprefixer({ browsers: ['last 2 version'], remove: false}))
    .pipe(gulp.dest('.tmp/'));
});

// inject bower components
gulp.task('wiredep', function () {
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
    .pipe(gulp.dest('app/main/assets/fonts'));
});

gulp.task('environment', function () {
  return gulp.src('app/*/constants/config-const.js')
    .pipe(
      $.inject(
        gulp.src('app/main/constants/env-' + options.env + '.json'),
        {
          starttag: '/*inject-env*/',
          endtag: '/*endinject*/',
          transform: function (filePath, file) {
            var json = JSON.parse(file.contents.toString('utf8'));
            json = JSON.stringify(json, null, 2);
            // replace all doublequotes with singlequotes
            json = json.replace(/\"/g, '\'');
            // remove first and last line curly braces
            json = json.replace(/^\{\n/, '').replace(/\n\}$/, '');
            // remove indentation
            json = json.replace(/  /g, '');
            return json;
          }
        }))
    .pipe(gulp.dest('app/'));
});
