// @ts-check
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
 * @type {*} config
 */
const config  = {
  devtool: 'source-map',
  mode: 'development',
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
              camelCase: true,
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
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        loader: 'url-loader',
        query: {
          limit: 1,
          name: '[path][name].[hash].[ext]',
          emitFile: true,
        }
      },
      {
        test: /\.(eof|woff|woff2|svg|eot|ttf)$/,
        loader: 'file-loader',
        query: {
          name: `assets/[name].[hash].[ext]`,
          emitFile: true,
        }
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
    alias: {
      src: pathResolve('src'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0',
    port: process.env.PORT || 9000,
  }
}

module.exports = config
