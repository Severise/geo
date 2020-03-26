const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins
const htmlFiles = getFilesFromDir(PAGE_DIR, [".html"]);

// const htmlPlugins = htmlFiles.map( filePath => {
//   const fileName = filePath.replace(PAGE_DIR, "");
//   return new HtmlWebPackPlugin({
//     chunks:[fileName.replace(path.extname(fileName), ""), "vendor"],
//     template: filePath,
//     filename: fileName})
// });
module.exports = {
    entry: './src/index.js',
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(png|jp(e*)g|svg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[hash]-[name].[ext]',
                    },
                }, ],
            },
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path: __dirname + '/',
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './'
    }
};