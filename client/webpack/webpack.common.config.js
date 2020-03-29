/**
 * webpack.common.config.mjs
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */

const DotEnv = require('dotenv-webpack');
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
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
                from: 'src/manifest.json',
                to: 'manifest.json',
                toType: 'file'
            },
            {
                from: 'src/assets/images',
                to: 'assets/images',
                toType: 'dir'
            }
        ]),
        new OfflinePlugin({
            externals: [
                'assets/images/icons/android-chrome-192x192.png',
                'assets/images/icons/android-chrome-512x512.png',
                'assets/images/icons/apple-touch-icon.png',
                'manifest.json'
            ],
        })
    ]
};