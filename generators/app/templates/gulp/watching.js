'use strict';
// gulp
var gulp = require('gulp');
var paths = gulp.paths;
var options = gulp.options;
// modules
var bs = require('browser-sync').create();
var chalk = require('chalk');

var bsInit = function (paths, openOverride) {
  var bsOptions = {
    server: {
      baseDir: paths
    }
  };
  if (options.proxyMapTo && options.proxyPath) {
    var url = require('url');
    var proxy = require('proxy-middleware');
    var proxyOptions = url.parse(options.proxyMapTo);
    proxyOptions.route = options.proxyPath;

    bsOptions.server.middleware = [proxy(proxyOptions)];

    console.log('[' + chalk.green('proxy') + '] ' + chalk.bold('Proxy Configuration:'));
    console.log(chalk.dim(' ---------------------------------------'));
    console.log('     Path: ' + chalk.green(options.proxyPath));
    console.log('   Map to: ' + chalk.green(options.proxyMapTo));
    console.log(chalk.dim(' ---------------------------------------'));
  }
  if (options.open === false) {
    bsOptions.open = false;
  }
  if (openOverride !== undefined) {
    bsOptions.open = openOverride;
  }
  bs.init(bsOptions);
};

// WATCH
gulp.task('watch', ['inject-all'], function () {

  // browser sync server
  bsInit(['app', '.tmp']);

  var watchFiles = paths.jsFiles
    .concat([
      'app/index.html',
      '.tmp/*/styles/*.css', // each module's css
      'app/*/assets/**/*'
    ])
    .concat(paths.templates);

  // start linting and watching
  gulp.start('linting');
  gulp.watch(watchFiles, function (event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    if (event.type === 'changed') {
      bs.reload();
      gulp.start('linting');
    }
    else { // added or deleted
      // inject in index (implicitly reloads)
      gulp.start('inject-all');
    }
  });
  // watch for changes in scss
  gulp.watch('app/*/styles/**/*.scss', ['styles']);
  // watch for changes in environment files and new config files
  gulp.watch([
    'app/main/constants/env-*.json',
    'app/*/constants/*config-const.js'
  ], ['environment']);
});

// WATCH-BUILD
var watchBuildDeps = [];
if (options.build !== false) {
  watchBuildDeps.push('build');
}
gulp.task('watch-build', watchBuildDeps, function () {
  bsInit(paths.dist);
  gulp.watch(paths.dist + '/**/*', function () {
    bs.reload();
  });
});

// SERVE TASKS FOR PROTRACTOR
gulp.task('serve', ['inject-all'], function () {
  bsInit(['app', '.tmp'], false);
});
gulp.task('serve-build', ['build'], function () {
  bsInit(['app', '.tmp'], false);
});
