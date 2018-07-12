var gulp = require('gulp')

// var config = require('../config')

gulp.task('build', ['html-entry', 'js', 'style', 'fonts', 'copy-assets'])
