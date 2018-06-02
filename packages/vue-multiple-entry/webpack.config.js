const path = require('path')
const shelljs = require('shelljs')
const HTMLWebpackPlugin = require('html-webpack-plugin')

let entries = {}
let htmlPagePlugins = []
let isProd = process.env.NODE === 'prod'

shelljs.ls('-d', './src/app/*/').forEach((entry) => {
  const entryName = entry.split('/').slice(-2)[0]
  entries[entryName] = ['./src/polyfills.js', `${entry}index.js`]
  htmlPagePlugins.push(
    new HTMLWebpackPlugin({
      filename: `${entryName}.html`,
      template: './src/template.ejs',
      title: `${entryName.toUpperCase()} Page`,
      chunks: [entryName],
    }),
  )
})

module.exports = {
  devtool: 'source-map',
  mode: isProd ? 'production' : 'development',
  entry: entries,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        use: ['vue-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'resolve-url-loader',
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 30000,
          name: '[path][name].[hash].[ext]',
          emitFile: true,
        },
      },
      {
        test: /\.(eof|woff|woff2|svg|eot|ttf)$/,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [...htmlPagePlugins],
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      src: path.resolve(__dirname, 'src'),
      styles: path.resolve(__dirname, 'src/styles'),
    },
  },
  externals: {
    vue: isProd && 'Vue',
    axios: 'axios',
  },
}
