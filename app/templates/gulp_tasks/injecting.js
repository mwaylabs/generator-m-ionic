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
gulp.task('inject-all', ['styles', 'wiredep', 'bower-fonts', 'environment', 'build-vars'], function () {

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
  return gulp.src('app/*/styles/main.scss')
    .pipe($.plumber())
    .pipe($.rubySass({
      style: 'expanded',
      precision: 10,
      'sourcemap=none': true // disable sourcemap to avoid unkown word error
      // issue (should be fixed when 1.0.0 is stable: https://github.com/sindresorhus/gulp-autoprefixer/issues/20
      // solution: http://stackoverflow.com/questions/26979433/gulp-with-gulp-ruby-sass-error-style-css-map31-unknown-word
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

/**
 * transforms object into a string format that is ready for injection
 * @param  {Object} obj Object with values to inject
 * @return {String}     properly formatted string
 */
var injectFormat = function (obj) {
  obj = JSON.stringify(obj, null, 2);
  // replace all doublequotes with singlequotes
  obj = obj.replace(/\"/g, '\'');
  // remove first and last line curly braces
  obj = obj.replace(/^\{\n/, '').replace(/\n\}$/, '');
  // remove first level of indentation
  obj = obj.replace(/^  /g, '');
  obj = obj.replace(/\n  /g, '\n');

  return obj;
};

gulp.task('environment', function () {
  return gulp.src('app/*/constants/config-const.js')
    .pipe(
      $.inject(
        gulp.src('app/main/constants/env-' + options.env + '.json'),
        {
          starttag: '/*inject-env*/',
          endtag: '/*endinject*/',
          transform: function (filePath, file) {
            var json;
            try {
              json = JSON.parse(file.contents.toString('utf8'));
            }
            catch (e) {
              console.log(e);
            }

            if (json) {
              json = injectFormat(json);
            }
            return json;
          }
        }))
    .pipe(gulp.dest('app/'));
});

gulp.task('build-vars', ['environment'], function () {
  return gulp.src('app/*/constants/config-const.js')
    .pipe(
      $.inject(
        gulp.src(''),
        {
          starttag: '/*inject-build*/',
          endtag: '/*endinject*/',
          transform: function () {
            var obj = {};
            var buildVars = options.buildVars;

            if (buildVars) {
              // loop over build variables
              var variables = buildVars.split(',');
              for (var i = 0, variable; (variable = variables[i]); i++) {
                var splits = variable.split(':');
                // add key and value to object
                obj[splits[0]] = splits[1];
              }
              return injectFormat(obj);
            }
            else {
              return;
            }
          }
        }))
    .pipe(gulp.dest('app/'));
});
