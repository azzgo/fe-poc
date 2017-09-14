import * as HTMLWebpackPlugin from 'html-webpack-plugin';
import * as path from 'path';
import { Configuration, optimize } from 'webpack';

const config: Configuration = {
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
      template: './app/index.html'
    }),
    new optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
  ],
  node: {
    global: true,
    process: true,
    Buffer: false,
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false,
    clearTimeout: true,
    setTimeout: true
  },
  devServer: {
    port: process.env.PORT || 9000,
    historyApiFallback: true
  }
};

export = config;
