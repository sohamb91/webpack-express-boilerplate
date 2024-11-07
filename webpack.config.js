const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');


module.exports = {
    mode: "development",
    entry: {
        index: ['webpack-hot-middleware/client?reload=true', './src/js/index.js'],
        about: ['webpack-hot-middleware/client?reload=true','./src/js/about.js']
    },
    output: {
        filename: "[name][contenthash].bundle.js",
        path: path.join(__dirname,  "dist"),
        clean: true,
        publicPath: "/"
    },
    module: {
        rules: [
            {
              test: /\.css$/,
              use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
              test: /\.ejs$/,
              use: [
                {
                  loader: 'ejs-loader',
                  options: {
                    esModule: true,
                    variable: 'data',
                  },
                },
              ],
            },
          ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
          filename: '[name].css',  
        }),
        new HTMLWebpackPlugin({
            template: './views/index.ejs',
            chunks: ["index"],
            filename: "index.html"
        }),
        new HTMLWebpackPlugin({
            template: './views/about.ejs',
            chunks: ["about"],
            filename: "about.html"
        }),
    ]
}