module.exports = {
  plugins: [
    require('autoprefixer')({
      remove: false,
      browsers: ['last 5 versions'],
    }),
  ],
}
