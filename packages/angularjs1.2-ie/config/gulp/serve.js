var path = require('path')
var gulp = require('gulp')
var bs = require('browser-sync').create()
var runSequence = require('run-sequence');
var config = require('../config')

function reloadBs() {
  console.log('BrowserSync Reaload!')
  bs.reload()
}

gulp.task('start-bs', function() {
  bs.init({
    server: {
      baseDir: path.resolve(config.root, './dist'),
      routes: {
        "/fonts": path.resolve(config.root, 'libs/fonts'),
        "/assets": path.resolve(config.root, 'assets'),
      }
    },
    host: config.host,
    port: config.port,
    open: false
  })
})

gulp.task('watch-html-entry', function() {
  return gulp.watch([path.resolve(config.root, 'src/index.html')], ['html-entry'])
    .on('change', reloadBs)   
})

gulp.task('watch-browserify', function() {
  return gulp.watch(
    [
      path.resolve(config.root, 'src/**/*.js'),
      `!{path.resolve(config.root, 'src/index.html')}`,
      path.resolve(config.root, 'src/**/*.html'),
    ], ['js'], reloadBs)
    .on('change', reloadBs)
})

gulp.task('watch-style', function() {
  return gulp.watch([path.resolve(config.root, 'src/**/*.less')], ['style'], reloadBs)
    .on('change', reloadBs)
})


gulp.task('serve', function() {
  runSequence(
    'start-bs',
    ['html-entry', 'js', 'style'],
    ['watch-html-entry', 'watch-browserify', 'watch-style']
  )
})