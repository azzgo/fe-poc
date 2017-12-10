// @ts-check
/// <reference types="webpack" />
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CheckerPlugin } = require('awesome-typescript-loader')
const path = require('path')
const webpack = require('webpack')

/**
 * @param {string[]} args 
 */
const pathResolve = (...args) => {
  return path.resolve(__dirname, ...args)
}

/**
 * @type {webpack.Configuration} config
 */
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
        use: ['awesome-typescript-loader'],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              module: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
              importLoaders: 1,
            }
          },
          'less-loader',
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: pathResolve('./src/index.html'),
    }),
    new CheckerPlugin(),
    new webpack.NamedModulesPlugin(),
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
