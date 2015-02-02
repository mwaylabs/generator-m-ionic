/* jshint -W079 */ // prevent redefinition of $ warning

'use strict';
// gulp
var gulp = require('gulp');
var paths = gulp.paths;
// plugins
var $ = require('gulp-load-plugins')();
// modules
var opn = require('opn');
var serveStatic = require('serve-static');
var serveIndex = require('serve-index');
var connectLiveReload = require('connect-livereload');

gulp.task('watch', ['connect', 'serve'], function () {
  $.livereload.listen();

  // watch for changes
  gulp.watch([
    'app/*.html',
    '.tmp/main/styles/*.css',
    'app/*/assets/**/*',
    'app/*/templates/**/*'
  ].concat(paths.jsFiles))
  .on('change', function () {
    $.livereload.reload();
    gulp.start('inject-only'); // TODO: only run when added/deleted files
    // FIXME: when deleting second watch is not started: index.html OK but 404 in livereload
    // FIXME: not watching new files?!
  });

  // watch for changes in scss
  gulp.watch('app/*/styles/**/*.scss', ['styles']);
  // watch for changes in bower.json
  gulp.watch('bower.json', ['wiredep']);
});

gulp.task('serve', ['connect', 'inject', 'styles'], function () {
  opn('http://localhost:9000');
});
gulp.task('connect', function () {
  var app = require('connect')()
    .use(connectLiveReload({port: 35729}))
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

gulp.task('serve-build', ['connect-build', 'build'], function () {
  opn('http://localhost:9000');
});
gulp.task('connect-build', function () {
  var app = require('connect')()
    .use(serveStatic(paths.dist))
    .use(serveIndex(paths.dist));

  require('http').createServer(app)
    .listen(9000)
    .on('listening', function () {
      console.log('Started connect web server on http://localhost:9000');
    });
});
