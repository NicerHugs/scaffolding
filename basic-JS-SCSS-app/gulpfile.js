'use strict';

var gulp = require('gulp');
var connect = require('connect');
var reload = require('connect-livereload');
var http = require('http');
var serveStatic = require('serve-static');
var serveIndex = require('serve-index');
var useref = require('gulp-useref');


// =============================================================================
//                            Development
// =============================================================================

// build the tmp folder that is where things are actually served from in development
gulp.task('tmp', ['html', 'js', 'vendorJS', 'css'], function() {
});

  gulp.task('html', function() {
    gulp.src('app/index.html')
      .pipe(gulp.dest('tmp'));
  });

  // compile js
  gulp.task('js', function() {
    gulp.src('app/scripts/main.js')
      .pipe(gulp.dest('tmp'));
  });

  // compile sass
  gulp.task('scss', function() {

  });

  // compile vendor files
  gulp.task('vendor', function() {
    var assets = useref.assets();
    return gulp.src('app/*.html')
      .pipe(assets)
      .pipe(assets.restore())
      .pipe(useref())
      .pipe(gulp.dest('tmp'));
  });

// make watch tasks that watches src code and compiles it into tmp (calls appropriate above task)

gulp.task('watch', function() {
  gulp.watch('app/scripts/**/*.js', ['js']);
  gulp.watch('app/styles/**/*.scss', ['scss']);
  gulp.watch('app/index.html', ['vendor']);
});

// make a connect task that makes and connects to server that loads static files from tmp
gulp.task('connect', function () {
  var app = connect();
  app.use(serveStatic('tmp'));
  http.createServer(app).listen(3000);
});

// make a reload task that watches the tmp folder for changes and reloads the server

// make a serve task that starts the watch task, starts the connect task, and then starts the reload task
// make a clean task that kills the tmp folder when the server stops running?

// =============================================================================
//                            Distribution
// =============================================================================

// make a dist folder that is like the tmp folder but for 'production', so minified etc

// make a build task that builds the dist folder based on current app state
