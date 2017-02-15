'use strict';
// gulp
var gulp = require('gulp');
var paths = gulp.paths;
var options = gulp.options;
// modules
var bs = require('browser-sync').create('m-ionic');
var chalk = require('chalk');

var bsInit = function (paths, openOverride) {
  var bsOptions = {
    server: {
      baseDir: paths
    }
  };
  if (options.proxy) {
    var url = require('url');
    var proxyMiddleware = require('proxy-middleware');
    var process = require('process');
    var path = require('path');
    var proxyConfs = require(path.join(process.cwd(), 'package.json'))['generator-m-ionic'].proxies;

    console.log('[' + chalk.green('proxy') + '] ' + chalk.bold('Proxy Configuration:'));
    console.log(chalk.dim(' ---------------------------------------'));
    var middleware = [];
    for (var proxyConf, i = 0; (proxyConf = proxyConfs[i]); i++) {
      var proxyOptions = url.parse(proxyConf.proxyMapTo);
      proxyOptions.route = proxyConf.proxyMapFrom;

      middleware.push(proxyMiddleware(proxyOptions));

      console.log('   Map From: ' + chalk.green(proxyConf.proxyMapFrom));
      console.log('     Map to: ' + chalk.green(proxyConf.proxyMapTo));
      console.log(chalk.dim(' ---------------------------------------'));
    }
    bsOptions.server.middleware = middleware;
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

  // start linting and watching
  gulp.start('linting');
  gulp.watch(paths.watchFiles, function (event) {
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
  gulp.watch(paths.scssFiles, ['styles']);
  // watch for changes in css
  gulp.watch(paths.cssFiles, function () {
    gulp.src(paths.cssFiles).pipe(bs.stream());
  });
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
