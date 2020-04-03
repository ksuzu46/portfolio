/**
 * webpack.common.config.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */

const DotEnv = require('dotenv-webpack');
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'none',
    module: {
        rules: [ {
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
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
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        },
    },
    plugins: [
        new DotEnv(),
        new CleanWebpackPlugin(),
        new CopyPlugin([
            {
                from: './manifest.json',
                to: 'manifest.json',
                toType: 'file'
            },
            {
                from: './robots.txt',
                to: 'robots.txt',
                toType: 'file'
            },
            {
                from: './assets/images',
                to: 'assets',
                toType: 'dir'
            }
        ]),
        new OfflinePlugin({
            externals: [
                'robots.txt,',
                'manifest.json',
                'assets/images/icons/icon-72x72.png',
                'assets/images/icons/icon-96x96.png',
                'assets/images/icons/icon-120x120.png',
                'assets/images/icons/icon-140x140.png',
                "assets/images/icons/icon-128x128.png",
                "assets/images/icons/icon-144x144.png",
                "assets/images/icons/icon-192x192.png",
                "assets/images/icons/icon-384x384.png",
                "assets/images/icons/icon-512x512.png",
                'assets/images/icons/favicon.ico'
            ],
        }),
        new htmlWebpackPlugin({
            inject: false,
            template: require('html-webpack-template'),
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
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css?family=Montserrat:400,700'
                },
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic"'
                },
                {
                    rel: 'apple-touch-icon',
                    sizes: '120x120',
                    href: "./src/assets/images/icons/icon-120x120.png"
                },
                {
                    rel: 'apple-touch-icon',
                    sizes: '180x180',
                    href: "./src/assets/images/icons/icon-180x180.png"
                },
                {
                    rel: 'manifest',
                    href: './manifest.json'
                }
            ],
            mobile: true,
            lang: 'en-US',
            favicon: './assets/images/icons/favicon.ico',
        })
    ]
};