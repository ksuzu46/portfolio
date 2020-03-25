/**
 * webpack.common.config.mjs
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */

const DotEnv = require('dotenv-webpack');
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
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
                name: '[path]/[name].[ext]'
            }
        }, {
            test: /\.(ttf|eot|svg|gif)(\?[\s\S]+)?$/,
            loader: 'url-loader',
            options: {
                name: "[path]/[name].[ext]"
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
        new CopyPlugin([ {
                from: 'src/manifest.json',
                to: 'manifest.json',
                toType: 'file',
            } ]),
        new WorkboxPlugin.GenerateSW({
            swDest: './sw.js',
            skipWaiting: true,
            clientsClaim: true,
            exclude: [ /\.(?:png|jpg|jpeg|svg)$/ ],
            
            // Define runtime caching rules.
            runtimeCaching: [ {
                urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
                handler: 'CacheFirst',
                options: {
                    // Use a custom cache name.
                    cacheName: 'images',
                    expiration: {
                        maxEntries: 10,
                    },
                },
            } ],
        }),
    ]
};