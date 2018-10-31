var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var webpack = require('webpack')
var path = require('path')
var config = require('./config/config')

module.exports = {
  mode: config.isProd ? 'production' : 'development',
  entry: {
    main: './src/main.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader']
      },
      {
        test: /\.js$/,
        use: ['ng-annotate-loader'],
        exclude: [/node_modules/]
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 30000,
          name: '[path][name].[hash].[ext]',
          emitFile: true
        }
      },
      {
        test: /\.(eof|woff|woff2|svg|eot|ttf)$/,
        loader: 'file-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      src: path.resolve(__dirname, 'src'),
      styles: path.resolve(__dirname, 'src/styles'),
      assets: path.resolve(__dirname, 'assets')
    }
  },
  plugins: [
    new CleanWebpackPlugin('dist'),
    new webpack.ContextReplacementPlugin(
      /@angular(\\|\/)core(\\|\/)fesm5/,
      __dirname
    ),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CopyWebpackPlugin([
      {
        from: './libs/',
        to: 'libs',
        toType: 'dir'
      }
    ])
  ],
  devServer: {
    stats: {
      warningsFilter: /System.import/ // https://github.com/angular/angular/issues/21560
    },
    port: config.port,
    host: config.host
  }
}
