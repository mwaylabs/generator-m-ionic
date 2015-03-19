/* jshint -W079 */ // prevent redefinition of $ warning

'use strict';
// gulp
var gulp = require('gulp');
var options = gulp.options;
// plugins
var $ = require('gulp-load-plugins')();
// packages
var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');

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

gulp.task('cordova', runCordova);
gulp.task('cordova-with-build', ['build'], runCordova);

// removes platform and all plugin dirs and then
// adds platforms and plugins based on <platform>.jsons
gulp.task('cordova-install', function () {

  var pluginsDir = 'plugins/';
  var dirs = ['platforms'];
  var install = {
    platforms: [],
    plugins: []
  };

  // read files
  var yoRcAnswers = JSON.parse(fs.readFileSync('.yo-rc.json', 'utf8'))['generator-m'].answers;
  var plugins = JSON.parse(fs.readFileSync(pluginsDir + 'fetch.json', 'utf8'));

  var platforms = fs.readdirSync(pluginsDir) // all plugin files
  // only filter json files, and populate dirs array
  .filter(function (fileName) {
    if (fileName.indexOf('.json') !== -1 && fileName.indexOf('fetch') === -1) {
      // all platforms but ignore fetch.json
      return true;
    }
    else {
      // push directories to dirs array
      var stat = fs.statSync(pluginsDir + fileName);
      if (stat.isDirectory()) {
        dirs.push(pluginsDir + fileName);
      }
      return false;
    }
  })
  // extract platform
  .map(function (fileName) {
    return /(.*)\.json$/ig.exec(fileName)[1];
  });

  // remove all dirs (platforms and plugins)
  dirs.forEach(function (dir) {
    rimraf.sync(dir);
  });

  var stream = gulp.src('');
  // add platforms
  platforms.forEach(function (platform) {
    // delete .json file, so plugins get added after platforms (errors otherwise!)
    fs.unlinkSync(pluginsDir + platform + '.json');
    // add platform
    for (var i = 0, yoPlatform; (yoPlatform = yoRcAnswers.platforms[i]); i++) {
      // replace with platform from yorcjson (which may contain version)
      if (yoPlatform.indexOf(platform) === 0) {
        platform = yoPlatform;
      }
    }
    // wait with execution until previous command has finished
    stream = runCordova('platform add ' + platform, stream);
    install.platforms.push(platform);
  });

  // add plugins
  for (var plugin in plugins) {
    for (var j = 0, yoPlugin; (yoPlugin = yoRcAnswers.plugins[j]); j++) {
      // replace with plugin from .yo-rc.json (which may contain version)
      if (yoPlugin.indexOf(plugin) === 0) {
        plugin = yoPlugin;
      }
    }
    // if no version control in .yo-rc.json install via url if possible
    if (plugin.indexOf('@') === -1) {
      if (plugins[plugin].source.type === 'git') {
        plugin = plugins[plugin].source.url;
      }
    }
    // wait with execution until previous command has finished
    stream = runCordova('plugin add ' + plugin, stream);
    install.plugins.push(plugin);
  }
  console.log(JSON.stringify(install, null, 2));
});
