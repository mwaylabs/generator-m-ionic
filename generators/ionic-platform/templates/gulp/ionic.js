'use strict';
// gulp
var gulp = require('gulp');
var paths = gulp.paths;
// plugins
var $ = require('gulp-load-plugins')();

// reads contents from .io-config.json and pastes them into both ionic.io bundle files (bundle.js and bundle.min.js) of ionic-platform-web-client
gulp.task('ionic-platform', function () {
  var libPath = paths.bowerComponents + '/ionic-platform-web-client/dist';
  var libFile = libPath + '/ionic.io*';
  var configFile = '.io-config.json';
  return gulp.src(libFile)
    .pipe(
      $.inject(
        gulp.src(configFile),
        {
          starttag: '"IONIC_SETTINGS_STRING_START";',
          endtag: '"IONIC_SETTINGS_STRING_END"',
          transform: function (filePath, file) {
            var json;
            try {
              json = JSON.parse(file.contents.toString('utf8'));
            }
            catch (e) {
              console.log(e);
            }

            var string = '';
            if (json) {
              string += 'var settings = ';
              string += JSON.stringify(json);
              string += '; return { get: function(setting) { if (settings[setting]) { return settings[setting]; } return null; } };';
            }
            return string;
          }
        }
      )
    )
    .pipe(gulp.dest(libPath));
});
