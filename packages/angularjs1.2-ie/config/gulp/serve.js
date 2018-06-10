const path = require('path')
const gulp = require('gulp')
const bs = require('browser-sync').create()
const runSequence = require('run-sequence');
const config = require('../config')

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

gulp.task('watch-css', function() {
  return gulp.watch([path.resolve(config.root, 'src/**/*.css')], ['css'], reloadBs)
    .on('change', reloadBs)
})


gulp.task('serve', function() {
  runSequence(
    'start-bs',
    ['html-entry', 'js', 'css'],
    ['watch-html-entry', 'watch-browserify', 'watch-css']
  )
})