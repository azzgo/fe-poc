const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'eval',
  context: path.relative(__dirname, '.'),
  entry: {
    main: './src/app/app.jsx'
  },
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),

  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css', '.scss'],
  }
}