// @ts-check
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CheckerPlugin } = require('awesome-typescript-loader')
const path = require('path')

/**
 * @param {string[]} args 
 */
const pathResolve = (...args) => {
  return path.resolve(__dirname, ...args)
}

const config  = {
  entry: {
    app: pathResolve('./src/App.tsx')
  },
  output: {
    filename: '[name].bundle.js',
    path: pathResolve('./build')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      },
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: pathResolve('./src/index.html'),
    }),
    new CheckerPlugin()
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0',
    port: process.env.PORT || 9000,
  }
}

module.exports = config
