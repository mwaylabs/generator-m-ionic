'use strict';
// gulp
var gulp = require('gulp');
var options = gulp.options;
var paths = gulp.paths;
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
  var slash = '/';

  var resourceFiles = 'res/*/' + setFolder + '/**/*';
  return gulp.src(resourceFiles)
    .pipe($.rename(function (path) {
      if (path.dirname.search(/\\/ig) > -1) {
        slash = '\\';
      }
      path.dirname = path.dirname.replace(slash + setFolder, slash + 'current');
    }))
    .pipe(gulp.dest('res'));
});

// LIVERELOAD
gulp.task('livereload', ['serve-livereload'], function () {
  return runCordova(options.livereload + ' --noprepare');
});
gulp.task('serve-livereload', ['cordova-prepare'], function (done) {
  // initialize patcher with cwd and options to react to platform
  // given in options
  var patcher = new Patcher(process.cwd(), options);

  var bsOptions = {
    logConnections: true,
    open: false,
    files: ['app', '.tmp'],
    server: {
      baseDir: ['app', '.tmp'].concat([patcher.wwwPath]),
      // add platform www's for cordova.js
    }
  };

  bs.init(bsOptions, function (err, bsInstance) {
    if (err) {
      console.log(err);
    }
    var urls = bsInstance.options.getIn(['urls']);
    // patch platform's config xml to allow navigation to
    // & to set content tag to browsersync's externalUrl
    patcher.patchConfigXml(urls.get('external'));
    done();

    // start linting and watching
    gulp.start('linting');
    gulp.watch(paths.watchFiles, function (event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
      if (event.type === 'changed') {
        gulp.start('linting');
      }
      else { // added or deleted
        // inject in index (implicitly reloads)
        gulp.start('inject-all');
      }
    });
    // watch for changes in scss
    gulp.watch(paths.scssFiles, ['styles']);
    // watch for changes in environment files and new config files
    gulp.watch([
      'app/main/constants/env-*.json',
      'app/*/constants/*config-const.js'
    ], ['environment']);

  });
});
gulp.task('cordova-prepare', ['inject-all'], function () {
  return runCordova('prepare');
});
