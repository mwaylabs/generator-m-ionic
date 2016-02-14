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

<% if (answers.jade) { -%>
var jade = require( 'gulp-jade' );
<% } -%>

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

gulp.task('clean', ['clean-styles','clean-templates'], function () {
  return gulp.src(paths.dist + '/*')
    .pipe(vinylPaths(del));
});

gulp.task('clean-styles', function () {
  return gulp.src(['.tmp/**/*.css'])
    .pipe(vinylPaths(del));
});

<% if (answers.jade) { -%>
gulp.task('clean-templates', function () {
  return gulp.src(['.tmp/**/*.html'])
    .pipe(vinylPaths(del));
});
<% } else { -%>
gulp.task('clean-templates', function () {
  return gulp.src([paths.dist + '/**/*.html'])
    .pipe(vinylPaths(del));
});
<% } -%>

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

<% if (answers.jade) { -%>
//compile jade
gulp.task('jade',['clean-templates'], function (done) {
     gulp.src(paths.jade)
      .pipe(jade())
      .pipe(gulp.dest('.tmp'))
      .on('end', done);
});

// copy jade templates to build
gulp.task('build-templates', ['jade'], function () {
  return gulp.src('.tmp/**/*.html')
  .pipe($.if(options.minify, $.htmlmin({
    removeComments: true,
    removeCommentsFromCDATA: true,
    collapseWhitespace: true,
    conservativeCollapse: true,
    collapseInlineTagWhitespace: true
  })))
  .pipe(gulp.dest(paths.dist));
});
<% } else { -%>

// copy html templates to build
gulp.task('build-templates', ['clean-templates'], function () {
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
<% } -%>

// copy assets, wait for fonts
gulp.task('build-assets', ['clean', 'bower-fonts'], function () {
  return gulp.src('app/*/assets/**/*')
    .pipe($.if(options.minify, $.imagemin()))
    .pipe(gulp.dest(paths.dist));
});
