/**
 * webpack.static.config.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.config');
const StaticGeneratorPlugin = require('static-site-generator-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = merge(common, {
    mode: 'production',
    entry: {
        app: './src/entry.js',
    },
    module: {
        rules: [
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
        path: path.resolve('./build', 'static'),
        filename: 'app.js',
        libraryTarget: 'umd'
    },
    optimization: {},
    devtool: '',
    plugins: [
        new StaticGeneratorPlugin({
            entry: 'app',
            globals: {
                window: {}
            }
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
    ]
});