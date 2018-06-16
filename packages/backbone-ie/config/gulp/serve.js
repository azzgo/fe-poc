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
      serveStatic: {
        "fonts": path.resolve(config.root, 'libs/fonts'),
        "assets": path.resolve(config.root, 'assets')
      }
    },
    host: config.host,
    port: config.port,
    open: false
  })
})

gulp.task('watch-ejs', function() {
  return gulp.watch([
    path.resolve(config.root, 'src/scripts/**/*.js'),
    path.resolve(config.root, 'src/pages/**/*.ejs')
  ], ['ejs'])
    .on('change', reloadBs)   
})


gulp.task('watch-css', function() {
  return gulp.watch([path.resolve(config.root, 'src/**/*.css')], ['css'], reloadBs)
    .on('change', reloadBs)
})


gulp.task('serve', function() {
  runSequence(
    'start-bs',
    ['ejs', 'css'],
    ['watch-ejs', 'watch-css']
  )
})