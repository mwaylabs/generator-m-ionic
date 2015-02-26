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

var runCordova = function (command) {
  command = typeof command === 'string' ? command : options.cordova;
  return gulp.src('')
    .pipe($.shell([
      // needs explicit cross-platform path
      path.join('node_modules/cordova/bin/cordova ') + command
    ]));
};

gulp.task('cordova', runCordova);
gulp.task('cordova-with-build', ['build'], runCordova);

// removes platform and all plugin folders and then
// adds platforms and plugins based on <platform>.jsons
gulp.task('cordova-install', function () {
  var yoRcAnswers = JSON.parse(fs.readFileSync('.yo-rc.json', 'utf8'))['generator-m'].answers;
  var pluginFolder = 'plugins/';
  var folders = ['platforms'];
  var installed = {
    platforms: [],
    plugins: []
  };

  var platforms = fs.readdirSync(pluginFolder) // all plugin files
  // only filter json files, and populate folders array
  .filter(function (fileName) {
    if (fileName.indexOf('.json') !== -1) {
      return true;
    }
    else {
      var stat = fs.statSync(pluginFolder + fileName);
      if (stat.isDirectory()) {
        folders.push(pluginFolder + fileName);
      }
      return false;
    }
  })
  // extract platform, read file, transform to json
  .map(function (fileName) {
    var content = JSON.parse(fs.readFileSync(pluginFolder + fileName, 'utf8'));
    return {
      path: pluginFolder + fileName,
      content: content,
      platform: /(.*)\.json$/ig.exec(fileName)[1]
    };
  });

  // remove all folders (platforms and plugins)
  folders.forEach(function (folder) {
    rimraf.sync(folder);
  });

  // add platforms and plugins
  platforms.forEach(function (platform, index) {
    // delete .json file
    fs.unlinkSync(platform.path);
    // add platform
    for (var i = 0, yoPlatform; (yoPlatform = yoRcAnswers.platforms[i]); i++) {
      // replace with platform from yorcjson (which may contain version)
      if (yoPlatform.indexOf(platform.platform) === 0) {
        platform.platform = yoPlatform;
      }
    }
    runCordova('platform add ' + platform.platform);
    installed.platforms.push(platform.platform);
    // add plugins
    if (index === 0) {
      var prop = 'installed_plugins';
      var plugins = platform.content[prop];
      for (var plugin in plugins) {
        for (var j = 0, yoPlugin; (yoPlugin = yoRcAnswers.plugins[j]); j++) {
          // replace with plugin from yorcjson (which may contain version)
          if (yoPlugin.indexOf(plugin) === 0) {
            plugins[j] = plugin = yoPlugin;
          }
        }
        runCordova('plugin add ' + plugin);
        installed.plugins.push(plugin);
      }
    }
  });
  console.log(JSON.stringify(installed, null, 2));
});
