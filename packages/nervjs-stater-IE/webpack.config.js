const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'eval-source-map',
  context: path.relative(__dirname, '.'),
  entry: {
    main: ['./src/polyfill.js', './src/App.jsx']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              module: true,
              camelCase: true
            },
          },
          'less-loader',
        ]
      },
      {
        test: /\.(png|jpg|gif|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}  
          }
        ]
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),

  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css', 'less'],
    alias: {
      src: path.resolve(__dirname, 'src'),
      'react': 'nervjs',
      'react-dom': 'nervjs',
    }
  }
}