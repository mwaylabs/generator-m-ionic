// generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
/* jshint -W079 */ // prevent redefinition of $ warning

'use strict';
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('styles', function () {<% if (answers.includeSass) { %>
  return gulp.src('app/styles/main.scss')
    .pipe($.plumber())
    .pipe($.rubySass({
      style: 'expanded',
      precision: 10
    }))<% } else { %>
  return gulp.src('app/styles/main.css')<% } %>
    .pipe($.autoprefixer('last 1 version'))
    .pipe(gulp.dest('.tmp/styles'));
});

// check for jshint errors
gulp.task('jshint', function () {
  return gulp.src('app/scripts/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
});

// check for jscs errors
gulp.task('jscs', function () {
  return gulp.src('app/scripts/**/*.js')
    .pipe($.jscs());
});

// copy partials
gulp.task('partials', function () {
  return gulp.src('app/partials/**/*.html')
    .pipe(gulp.dest('dist/partials'));
});

// build starting from main html file (index.html)
gulp.task('app', ['styles', 'partials'], function () {
  // only build assets that are actually used
  var assets = $.useref.assets({searchPath: '{.tmp,app}'});

  return gulp.src('app/*.html') // main html file
    // useref - parses build block in html, concatenate & replace files
    .pipe(assets)
    // TODO: implement flag to turn on
    // .pipe($.if('*.js', // angular DI & uglification
    //   $.ngAnnotate({
    //     remove: true,
    //     add: true,
    //     'single_quotes': true
    //   })
    //   .pipe($.uglify())
    // ))
    // .pipe($.if('*.css', $.csso())) // minify css
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe(gulp.dest('dist'));
});

// copy & minify images to dist/images
gulp.task('images', function () {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'));
});

// copy fonts to do dist/fonts and app/fonts
gulp.task('fonts', function () {
  return gulp.src(require('main-bower-files')().concat('app/fonts/**/*'))
    .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
    .pipe($.flatten())
    .pipe(gulp.dest('dist/fonts'))
    .pipe(gulp.dest('app/fonts')); // TODO: find a better way to inject $ionicons-font-path: "../fonts" !default; into main.scss on build
});

gulp.task('clean', require('del').bind(null, ['.tmp', 'dist']));

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

gulp.task('serve', ['connect'<% if (answers.includeSass) { %>, 'styles'<% } %>], function () {
  require('opn')('http://localhost:9000');
});

// TODO: do with commandline option - https://github.com/gulpjs/gulp/blob/master/docs/recipes/pass-arguments-from-cli.md
gulp.task('connect-build', function () {
  var serveStatic = require('serve-static');
  var serveIndex = require('serve-index');
  var app = require('connect')()
    .use(require('connect-livereload')({port: 35729}))
    .use(serveStatic('dist'))
    // paths to bower_components should be relative to the current file
    // e.g. in app/index.html you should use ../bower_components
    .use('/bower_components', serveStatic('bower_components'))
    .use(serveIndex('dist'));

  require('http').createServer(app)
    .listen(9000)
    .on('listening', function () {
      console.log('Started connect web server on http://localhost:9000');
    });
});

gulp.task('serve-build', ['build', 'connect-build'], function () {
  require('opn')('http://localhost:9000');
});

// inject bower components
gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;
// TODO:
//<% if (answers.includeSass) { %>
//   gulp.src('app/styles/*.scss') // into main.scss
//     .pipe(wiredep())
//     .pipe(gulp.dest('app/styles'));
//<% } %>
  return gulp.src('app/*.html') // into index.html
    .pipe(wiredep(<% if(answers.ionicSass) { %>{exclude: ['bower_components/ionic/release/css']}<% } %>))
    .pipe(gulp.dest('app'));
});

// inject app/**/.*js files into index.html
gulp.task('inject', function () {
  var sourceFiles = gulp.src(['./app/scripts/**/*.js']);
  return gulp.src('./app/index.html')
    .pipe($.inject(sourceFiles.pipe($.angularFilesort()), {relative: true}))
    .pipe(gulp.dest('./app'));
});

gulp.task('watch', ['connect', 'serve'], function () {
  $.livereload.listen();

  // watch for changes
  gulp.watch([
    'app/*.html',
    '.tmp/styles/**/*.css',
    'app/scripts/**/*.js',
    'app/images/**/*',
    'app/partials/**/*.html'
  ]).on('change', function () {
    $.livereload.changed();
    gulp.start('inject'); // TODO: only run when added/deleted files
    // FIXME: when deleting second watch is not started: index.html OK but 404 in livereload
  });

  // watch for changes in css/scss
  gulp.watch('app/styles/**/*.<%= answers.includeSass ? 'scss' : 'css' %>', ['styles']);
  // watch for changes in bower.json
  gulp.watch('bower.json', ['wiredep']);
});

gulp.task('build', ['jshint', 'jscs', 'app', 'images', 'fonts'], function () {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], function () {
  gulp.start('build');
});
