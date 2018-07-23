const glob = require('glob')
const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const files = glob.sync(path.resolve(__dirname, 'minifyingDependencies', '*.js'))
const entry = {}

for (var file of files) {
  var obj = path.parse(file)
  entry[obj.name] = file
}

module.exports = {
  entry,
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'minfiles'),
    filename: '[name].min.js',
    libraryTarget: 'umd',
  },
  resolve: {
    modules: [
      'node_modules',
    ],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'env'],
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '\'production\'',
      },
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        output: {
          comments: false //去除注释
        },
        warnings: false, //忽略警告
      }
    }),
  ],
}