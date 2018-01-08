const HTMLWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const { optimize } = require('webpack')

const config = {
  devtool: 'source-map',
  context: __dirname,
  entry: {
    vendor: './app/vendor.ts',
    main: './app/main.ts',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          'awesome-typescript-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './app/index.html',
    }),
    new optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
  ],
  devServer: {
    port: process.env.PORT || 9000,
    historyApiFallback: true,
  },
};

module.exports = config;
