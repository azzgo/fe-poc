import { Configuration, optimize } from 'webpack'
import * as path from 'path'
import * as HTMLWebpackPlugin from 'html-webpack-plugin'


const config: Configuration = {
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
          'awesome-typescript-loader'
        ]
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin(),
    new optimize.CommonsChunkPlugin({
      name: 'vendor',
    })
  ]
}

export = config
