const glob = require("glob");
const path = require("path");

const config = require("./minify.webpack.config");

const files = glob.sync(
  path.resolve(__dirname, "minifyingDependencies-node", "*.js")
);
const entry = {};

for (var file of files) {
  var obj = path.parse(file);
  entry[obj.name] = file;
}

module.exports = {
  ...config,
  entry,
  target: "node",
  output: {
    path: path.resolve(__dirname, "minfiles-node"),
    filename: "[name].js",
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["env"]
            }
          }
        ]
      },
      {
        test: /\.jsx?$/,
        include: /(node_modules)/,
        use: ['shebang-loader']
      }
    ]
  },
  plugins: [],
};
