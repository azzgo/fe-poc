const gulp = require('gulp')
const path = require('path')
const useref = require('gulp-useref')
const uglify = require('gulp-uglify');
const nano = require('gulp-cssnano');
const gulpif = require('gulp-if')
const concat = require('gulp-concat')
const replace = require('gulp-replace')
const browserify = require('browserify')
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const plumber = require('gulp-plumber');
const ngAnnotate = require('gulp-ng-annotate');
const lazypipe = require('lazypipe');
const postcss = require('gulp-postcss');

const config = require('../config')

const libjsPipe = lazypipe()
  .pipe(function() {
    return gulpif(config.isProd, uglify())
  })

const libCssPipe = lazypipe()
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
    .pipe(gulpif("*.js", libjsPipe()))
    .pipe(gulpif("*.css", libCssPipe()))
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
