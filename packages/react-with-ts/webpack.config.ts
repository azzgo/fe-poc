import { Configuration } from 'webpack'

const config: Configuration  = {
  entry: {
    app: './src/App.tsx'
  },
  output: {
    filename: '[name].bundle.js',
    path: "./build"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      },
    ]
  }
}

export = config
