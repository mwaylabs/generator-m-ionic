/* jshint -W079 */ // prevent redefinition of $ warning

'use strict';
// gulp
var gulp = require('gulp');
var paths = gulp.paths;
var options = gulp.options;
// plugins
var $ = require('gulp-load-plugins')();
// modules
var http = require('http');
var connect = require('connect');
var opn = require('opn');
var serveStatic = require('serve-static');
var connectLiveReload = require('connect-livereload');

var createConnectServer = function (paths) {
  return function () {
    var app = connect()
    .use(connectLiveReload({port: 35729}));
    for (var key in paths) {
      app.use(serveStatic(paths[key]));
    }
    http.createServer(app)
      .listen(9000)
      .on('listening', function () {
        console.log('Started connect web server on http://localhost:9000');
      });
  };
};

var open = function () {
  if (options.open !== false) {
    opn('http://localhost:9000');
  }
};

// WATCH
gulp.task('watch', ['serve', 'linting'], function () {
  $.livereload.listen();

  gulp.watch([
    'app/index.html',
    '.tmp/*/styles/main.css', // each module's main.css
    'app/*/assets/**/*',
    'app/*/templates/**/*',
  ].concat(paths.jsFiles),
  function (event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    if (event.type === 'changed') {
      $.livereload.reload();
      gulp.start('linting');
    }
    else { // added or deleted
      gulp.start('inject-all'); // inject in index (implicitly reloads)
    }
  });

  // watch for changes in scss
  gulp.watch('app/*/styles/**/*.scss', ['styles']);
  // watch for changes in environment files
  gulp.watch('app/main/constants/env-*.json', ['environment']);
});
gulp.task('serve', ['connect', 'inject-all'], open);
gulp.task('connect', createConnectServer(['app', '.tmp']));

// WATCH-BUILD
gulp.task('watch-build', ['serve-build'], function () {
  $.livereload.listen();

  gulp.watch(paths.dist + '/**/*', function () {
    $.livereload.reload();
  });
});

var serveBuildDependencies = ['connect-build'];
if (options.build !== false) {
  serveBuildDependencies.push('build');
}
gulp.task('serve-build', serveBuildDependencies, open);
gulp.task('connect-build', createConnectServer(paths.dist));
