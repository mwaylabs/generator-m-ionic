'use strict';
// gulp
var gulp = require('gulp');
var options = gulp.options;
var paths = gulp.paths;
// plugins
var $ = require('gulp-load-plugins')();
// modules
var del = require('del');
var vinylPaths = require('vinyl-paths');

var buildDependencies = [
  options['force-build'] ? 'linting' : 'linting-throw',
  'build-app',
  'build-templates',
  'build-assets'
];

gulp.task('build', buildDependencies, function () {
  return gulp.src(paths.dist + '/**/*')
    .pipe($.size({showFiles: true}));
});

gulp.task('clean', function () {
  // pattern is windows-friendly according to https://github.com/mwaylabs/generator-m-ionic/issues/223#issuecomment-196060284
  return gulp.src(['.tmp/**/*.*', paths.dist + '/**/*.*'])
    .pipe(vinylPaths(del));
});

// concatenate files in build:blocks inside index.html
// and copy to build folder destinations
gulp.task('build-app', ['clean', 'inject-all'], function () {
  var jsFilter = $.filter('**/*.js', {restore: true});
  var cssFilter = $.filter('**/*.css', {restore: true});

  var stream = gulp.src('app/index.html') // main html file
    .pipe($.useref({searchPath: '{.tmp,app}'})); // all assets (without index.html)

  if (options.minify) {
    stream
      .pipe(jsFilter)
      .pipe($.ngAnnotate({
        add: true,
        sourcemap: true
      }))
      .pipe($.uglify())
      .pipe(jsFilter.restore)
      .pipe(cssFilter)
      .pipe($.csso())
      .pipe(cssFilter.restore);
  }

  stream.pipe(gulp.dest(paths.dist));

  return stream;
});

// copy templates
gulp.task('build-templates', ['clean'], function () {
  return gulp.src(paths.templates)
  .pipe($.if(options.minify, $.htmlmin({
    removeComments: true,
    removeCommentsFromCDATA: true,
    collapseWhitespace: true,
    conservativeCollapse: true,
    collapseInlineTagWhitespace: true
  })))
  .pipe(gulp.dest(paths.dist));
});

// copy assets, wait for fonts
gulp.task('build-assets', ['clean', 'bower-fonts'], function () {
  return gulp.src('app/*/assets/**/*')
    .pipe($.if(options.minify, $.imagemin()))
    .pipe(gulp.dest(paths.dist));
});
