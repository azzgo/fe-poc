var gulp = require('gulp')
var path = require('path')
var useref = require('gulp-useref')
var uglify = require('gulp-uglify');
var nano = require('gulp-cssnano');
var gulpif = require('gulp-if')
var concat = require('gulp-concat')
var replace = require('gulp-replace')
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var plumber = require('gulp-plumber');
var lazypipe = require('lazypipe');
var postcss = require('gulp-postcss');
var ejs = require('gulp-ejs')
var less = require('gulp-less')

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

var lessPipe = lazypipe()
  .pipe(plumber)
  .pipe(less, {
    path: [path.join(config.root, 'styles')]
  })
  .pipe(postcss,[
    require('autoprefixer')({remove: false})
  ])

gulp.task('ejs', function() {
  return gulp.src([
      `!${path.resolve(config.root, 'src/**/_*.ejs')}`,
      path.resolve(config.root, 'src/**/*.ejs')
    ])
    .pipe(ejs({}, {} , { ext: '.html'}))
    .pipe(plumber())
    .pipe(useref({}, lazypipe().pipe(function() { return gulpif('*.less', lessPipe())})))
    .pipe(gulpif('*.js', libjsPipe()))
    .pipe(gulpif('*.css', libCssPipe()))
    .pipe(gulp.dest(path.resolve(config.dist)))
})

gulp.task('fonts', function() {
  return gulp.src(path.resolve(config.root, 'libs/fonts/*'))
    .pipe(gulp.dest(path.resolve(config.dist, 'fonts')))
})

gulp.task('copy-assets', function() {
  return gulp.src(path.resolve(config.root, 'assets/**/*'), {base: path.resolve(config.root, 'assets')})
    .pipe(gulp.dest(path.resolve(config.dist, 'assets')))
})
