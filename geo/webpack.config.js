const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins
const htmlFiles = getFilesFromDir(PAGE_DIR, [".html"]);

const htmlPlugins = htmlFiles.map( filePath => {
  const fileName = filePath.replace(PAGE_DIR, "");
  return new HtmlWebPackPlugin({
    chunks:[fileName.replace(path.extname(fileName), ""), "vendor"],
    template: filePath,
    filename: fileName})
});

module.exports = {
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};