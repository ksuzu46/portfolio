/**
 * prod.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.config');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OfflinePlugin = require('offline-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    output: {
        publicPath: '/',
        path: path.resolve('./build'),
        filename: '[name].[contenthash].js',
    },
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: true,
                        }
                        
                    },
                    "css-loader",
                    "sass-loader"
                ]
            },
        ],
    },
    optimization: {
        moduleIds: 'hashed',
        minimizer: [
            new TerserJSPlugin({}),
            new OptimizeCSSAssetsPlugin()
        ],
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: 10,
            minSize: 0,
            cacheGroups: {
                reactVendor: {
                    test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                    name: "reactVendor"
                },
                bootstrapVendor: {
                    test: /[\\/]node_modules[\\/](react-bootstrap)[\\/]/,
                    name: "bootstrapVendor"
                },
                vendors: {
                    test: /[\\/]node_modules[\\/](!react-bootstrap)[\\/]/,
                    name: "vendors"
                },
            }
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            fileName: '[name].[contenthash].css',
        }),
        new OfflinePlugin({
            updateStrategy: 'changed',
            autoUpdate: 120000,  // 2hrs
            responseStrategy: 'cache-first',
            // externals: [
            //     'robots.txt,',
            //     'manifest.json',
            //     'assets/images/icons/icon-72x72.png',
            //     'assets/images/icons/icon-96x96.png',
            //     'assets/images/icons/apple-touch-icon.png',
            //     'assets/images/icons/icon-140x140.png',
            //     "assets/images/icons/icon-128x128.png",
            //     "assets/images/icons/icon-144x144.png",
            //     "assets/images/icons/icon-192x192.png",
            //     "assets/images/icons/icon-384x384.png",
            //     "assets/images/icons/icon-512x512.png",
            //     'assets/images/icons/favicon.ico',
            //     'client/assets/images/loader.svg'
            // ],
        }),
    ],
    
});