var gulp = require('gulp')
var path = require('path')
var useref = require('gulp-useref')
var uglify = require('gulp-uglify');
var nano = require('gulp-cssnano');
var gulpif = require('gulp-if')
var concat = require('gulp-concat')
var replace = require('gulp-replace')
var browserify = require('browserify')
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var plumber = require('gulp-plumber');
var ngAnnotate = require('gulp-ng-annotate');
var lazypipe = require('lazypipe');
var postcss = require('gulp-postcss');

var config = require('../config')

var libjsPipe = lazypipe()
  .pipe(function() {
    return gulpif(config.isProd, uglify())
  })

var libCssPipe = lazypipe()
  .pipe(replace, '../fonts', './fonts')
  .pipe(function() {
    return gulpif(config.isProd, nano())
  })

gulp.task('html-entry', function() {
  return gulp.src(path.resolve(config.root, 'src/index.html'))
    .pipe(plumber())
    .pipe(replace(
      '<!-- inject-main -->',
      '<script src="./main.bundle.js"></script>'
    ))
    .pipe(useref())
    .pipe(gulpif('*.js', libjsPipe()))
    .pipe(gulpif('*.css', libCssPipe()))
    .pipe(gulp.dest(config.dist))
})

gulp.task('js', function() {
  return browserify(path.resolve(config.root, 'src/main.js'))
    .transform('browserify-ng-html2js')
    .bundle()
    .pipe(source('main.bundle.js'))
    .pipe(buffer())
    .pipe(plumber())
    .pipe(ngAnnotate())
    .pipe(gulp.dest(config.dist))
})

gulp.task('css', function() {
  return gulp.src(path.resolve(config.root, 'src/styles/**/*.css'))
    .pipe(plumber())
    .pipe(replace('../fonts', './fonts'))
    .pipe(concat('main.css'))
    .pipe(postcss([
      require('autoprefixer')({remove: false})
    ]))
    .pipe(gulpif(config.isProd, nano()))
    .pipe(gulp.dest(config.dist))
})

gulp.task('fonts', function() {
  return gulp.src(path.resolve(config.root, 'libs/fonts/*'))
    .pipe(gulp.dest(path.resolve(config.dist, 'fonts')))
})
