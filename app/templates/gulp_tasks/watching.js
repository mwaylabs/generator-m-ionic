/* jshint -W079 */ // prevent redefinition of $ warning

'use strict';
var gulp = require('gulp');
// load plugins
var $ = require('gulp-load-plugins')();
var paths = gulp.paths;

gulp.task('watch', ['connect', 'serve'], function () {
  $.livereload.listen();

  // watch for changes
  gulp.watch([
    'app/*.html',
    '.tmp/styles/**/*.css',
    'app/scripts/**/*.js',
    'app/images/**/*',
    'app/partials/**/*'
  ]).on('change', function () {
    $.livereload.changed();
    gulp.start('inject'); // TODO: only run when added/deleted files
    // FIXME: when deleting second watch is not started: index.html OK but 404 in livereload
    // FIXME: not watching new files?!
  });

  // watch for changes in scss
  gulp.watch('app/styles/**/*.scss', ['styles']);
  // watch for changes in bower.json
  gulp.watch('bower.json', ['wiredep']);
});

gulp.task('serve', ['connect', 'inject', 'styles'], function () {
  require('opn')('http://localhost:9000');
});
gulp.task('connect', function () {
  var serveStatic = require('serve-static');
  var serveIndex = require('serve-index');
  var app = require('connect')()
    .use(require('connect-livereload')({port: 35729}))
    .use(serveStatic('app'))
    .use(serveStatic('.tmp'))
    // paths to bower_components should be relative to the current file
    // e.g. in app/index.html you should use ../bower_components
    .use('/bower_components', serveStatic('bower_components'))
    .use(serveIndex('app'));

  require('http').createServer(app)
    .listen(9000)
    .on('listening', function () {
      console.log('Started connect web server on http://localhost:9000');
    });
});
gulp.task('connect-build', function () {
  var serveStatic = require('serve-static');
  var serveIndex = require('serve-index');
  var app = require('connect')()
    .use(require('connect-livereload')({port: 35729}))
    .use(serveStatic(paths.dist))
    .use('/bower_components', serveStatic('bower_components'))
    .use(serveIndex(paths.dist));

  require('http').createServer(app)
    .listen(9000)
    .on('listening', function () {
      console.log('Started connect web server on http://localhost:9000');
    });
});
