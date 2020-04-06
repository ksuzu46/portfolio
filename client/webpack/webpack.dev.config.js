/**
 *  dev.js
 *  @author [Keisuke Suzuki](https://github.com/Ks5810)
 */

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common.config.js');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    mode: 'development',
    output: {
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    devtool: 'cheap-module-source-map',
    devServer: {
        contentBase: path.join(__dirname, '../build'),
        liveReload: true,        // Always turn off when HMR is enabled
        historyApiFallback: true, // Will fallback to bundle.js in memory
        port: 3000,
        proxy: {
            '/api/gh': 'http://localhost:4444',
            '/api/mailer': 'http://localhost:4444'
        }
    },
    optimization: {
        noEmitOnErrors: true,
    },
    plugins: [
        new htmlWebpackPlugin({
            inject: false,
            template: require('html-webpack-template'),
            appMountId: 'app',
            title: 'Keisuke Suzuki',
            base: '/',
            meta: [
                {
                    charset: 'UTF-8'
                },
                {
                    name: 'name',
                    content: 'portfolio'
                },
                {
                    name: 'Description',
                    content: 'My portfolio site',
                }, {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1,' +
                             ' shrink-to-fit=no',
                }, {
                    name: 'apple-mobile-web-app-title',
                    content: 'Ksuzuki'
                }
            ],
            links: [
                {
                    rel: 'apple-touch-icon',
                    sizes: '120x120',
                    href: "/assets/images/icons/apple-touch-icon.png"
                }
            ],
            mobile: true,
            lang: 'en-US',
            favicon: './assets/images/icons/favicon.ico',
        })
    ],
});