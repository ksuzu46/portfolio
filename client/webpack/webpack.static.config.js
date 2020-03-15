/**
 * webpack.static.config.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */

const path = require('path');
const webpack = require('webpack');
const StaticGeneratorPlugin = require('static-site-generator-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const template = require('../template.js')

module.exports = {
    mode: 'production',
    context: path.resolve(__dirname, '../'),
    entry: {
        app: './src/entry.js',
    },
    module: {
        rules: [
            {
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: "url-loader"
            },
            {
                test: /\.(ttf|eot|svg|gif)(\?[\s\S]+)?$/,
                use: [
                    'url-loader',
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
                
            },
        ],
    },
    output: {
        path: path.resolve(__dirname, '../build/static/'),
        filename: 'app.js',
        libraryTarget: 'umd',
    },
    optimization: {},
    devtool: '',
    plugins: [
        new StaticGeneratorPlugin(
            {
                paths: ['/'],
                assets: [ 'app.js', 'app.css' ],
                globals: {
                    window: {}
                },
                locals: {
                    template: template
                }
            },
        ),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
    ]
};