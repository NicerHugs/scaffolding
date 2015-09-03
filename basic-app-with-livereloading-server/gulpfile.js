'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect');
var useref = require('gulp-useref');
var watch = require('gulp-watch');

// =============================================================================
//                            Development
// =============================================================================

// build the tmp folder that is where things are actually served from in development
gulp.task('tmp', ['html', 'css', 'js', 'vendor'], function() {
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

  // compile css
  gulp.task('css', function() {
    gulp.src('app/styles/*')
      .pipe(gulp.dest('tmp/styles'));
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
  gulp.watch('app/styles/**/*.css', ['css']);
  gulp.watch('app/index.html', ['vendor']);
});

// make a connect task that makes and connects to server that loads static files from tmp
gulp.task('connect', function () {
  connect.server({
    root: 'tmp',
    port: 3000,
    livereload: true
  });
});

// make a default task that starts the watch task, starts the connect task, and then starts the reload task
gulp.task('default', ['tmp', 'watch', 'connect'], function() {
  gulp.watch('tmp/**/*', ['reload']);
});

gulp.task('reload', function() {
  return gulp.src('tmp')
    .pipe(connect.reload());
});

// =============================================================================
//                            Distribution
// =============================================================================

// make a dist folder that is like the tmp folder but for 'production', so minified etc

// make a build task that builds the dist folder based on current app state
