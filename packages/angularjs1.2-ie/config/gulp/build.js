const gulp = require('gulp')

const config = require('../config')

gulp.task('build', ['html-entry', 'js', 'css', 'fonts'])
