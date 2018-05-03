const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const isProd = process.env.NODE_ENV === 'PROD'

module.exports = {
  devtool: isProd ? 'source-map' : 'inline-source-map',
  mode: isProd ? 'production' : 'development',
  entry: {
    main: ['babel-polyfill', './src/www-sources/main.js'],
  },
  output: {
    publicPath: '/sources/',
    path: path.resolve(__dirname, './public/sources'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
      },
      {
        test: /\.hbs$/,
        use: ['raw-loader']
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                url: false,
              }
            },
            'postcss-loader',
            'less-loader',
          ]
        }),
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract([
          {
            loader: 'css-loader',
            options: {
              url: false,
            }
          },
          'postcss-loader'
        ])
      }
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'styles.css',
      allChunks: true,
    }),
  ],
  node: {
    fs: 'empty'
  }
}
