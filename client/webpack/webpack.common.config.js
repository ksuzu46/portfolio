/**
 * webpack.common.config.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */

const DotEnv = require('dotenv-webpack');
const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
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
            test: /\.(ttf|eot|svg|gif|png)(\?[\s\S]+)?$/,
            loader: 'url-loader',
            options: {
                name: "[name].[ext]"
            }
        } ]
    },
    plugins: [
        new DotEnv(),
        new CleanWebpackPlugin(),
        new CopyPlugin([
            {
                from: 'manifest.json',
                to: 'manifest.json',
                toType: 'file'
            },
            {
                from: 'robots.txt',
                to: 'robots.txt',
                toType: 'file'
            },
            {
                from: 'assets/fonts',
                to: 'fonts',
                toType: 'dir'
            },
            {
                from: 'assets/images',
                to: 'images',
                toType: 'dir'
            }
        ]),
        new htmlWebpackPlugin({
            inject: false,
            template: require('html-webpack-template'),
            bodyHtmlSnippet: '<noscript>' +
                             '  <p>You need JavaScript to view this page</p>' +
                             '</noscript>',
            appMountId: 'app',
            title: 'Keisuke Suzuki',
            meta: [
                {
                    charset: 'UTF-8'
                },
                {
                    name: 'name',
                    content: 'portfolio'
                },
                {
                    name: 'theme-color',
                    content: "#516296"
                },
                {
                    name: 'Description',
                    content: 'My portfolio site',
                }, {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1,' +
                             ' shrink-to-fit=no',
                }, {
                    name: 'apple-mobile-web-app-capable',
                    content: 'yes'
                }, {
                    name: 'apple-mobile-web-app-status-bar-style',
                    content: 'black'
                }, {
                    name: 'apple-mobile-web-app-title',
                    content: 'Ksuzuki'
                }
            ],
            links: [
                {
                    rel: 'apple-touch-icon',
                    sizes: '120x120',
                    href: "/images/icons/apple-touch-icon.png"
                },
                {
                    rel: 'manifest',
                    href: '/manifest.json'
                }
            ],
            mobile: true,
            lang: 'en-US',
            favicon: './assets/images/icons/favicon.ico',
        })
    ]
};