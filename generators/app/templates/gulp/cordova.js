'use strict';
// gulp
var gulp = require('gulp');
var options = gulp.options;
// plugins
var $ = require('gulp-load-plugins')();
// packages
var path = require('path');
var process = require('process');
var del = require('del');
var vinylPaths = require('vinyl-paths');
var bs = require('browser-sync').create('m-ionic:livereload');
var Patcher = require('./utils/Patcher');

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

// CORDOVA
gulp.task('cordova', runCordova);
gulp.task('cordova-only-resources', ['resources'], runCordova);
gulp.task('cordova-with-build', ['build', 'resources'], runCordova);

// RESOURCES
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

// LIVERELOAD
gulp.task('livereload', ['serve-livereload', 'inject-all'], function () {
  // watch for changes in scss
  gulp.watch('app/*/styles/**/*.scss', ['styles']);
  return runCordova(options.livereload + ' --noprepare');
});
gulp.task('serve-livereload', ['cordova-prepare'], function (done) {
  var bsOptions = {
    logConnections: true,
    open: false,
    files: ['app', '.tmp'],
    server: {
      baseDir: ['app', '.tmp', 'platforms/ios/www/', 'platforms/android/assets/www/'],
      // platform www's for cordova.js
    }
  };

  bs.init(bsOptions, function (err, bsInstance) {
    if (err) {
      console.log(err);
    }
    var urls = bsInstance.options.getIn(['urls']);
    var patcher = new Patcher(process.cwd());
    // patch platform's config xml to allow navigation to
    // & to set content tag to bs externalUrl
    patcher.patchConfigXml(urls.get('external'));
    done();
  });
});
gulp.task('cordova-prepare', function () {
  return runCordova('prepare');
});
