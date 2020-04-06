/**
 * webpack.common.config.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */

const DotEnv = require('dotenv-webpack');
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'none',
    entry: {
        app: './src/index.js',
    },
    module: {
        rules: [ {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [ 'babel-loader', "eslint-loader" ]
        }, {
            test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader",
            options: {
                name: '[name].[ext]'
            }
        }, {
            test: /\.(ttf|eot|svg|gif)(\?[\s\S]+)?$/,
            loader: 'url-loader',
            options: {
                name: "[name].[ext]"
            }
        } ]
    },
    plugins: [
        new DotEnv(),
        new CleanWebpackPlugin(),
    ]
};