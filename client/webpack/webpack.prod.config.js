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
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const CopyPlugin = require('copy-webpack-plugin');


module.exports = merge(common, {
    mode: 'production',
    entry: {
        app: './src/index.js',
    },
    output: {
        publicPath: '/',
        path: path.resolve('./build'),
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            },
        ],
    },
    optimization: {
        minimizer: [
            new TerserJSPlugin({}),
            new OptimizeCSSAssetsPlugin({})
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
        // new webpack.optimize.AggressiveSplittingPlugin({
        //     minSize: 10000,
        //     maxSize: 30000,
        // }),
        new MiniCssExtractPlugin({
            fileName: '[name].css',
        }),
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
                to: 'assets/images',
                toType: 'dir'
            }
        ]),
        new OfflinePlugin({
            externals: [
                'robots.txt,',
                'manifest.json',
                'assets/images/icons/icon-72x72.png',
                'assets/images/icons/icon-96x96.png',
                'assets/images/icons/apple-touch-icon.png',
                'assets/images/icons/icon-140x140.png',
                "assets/images/icons/icon-128x128.png",
                "assets/images/icons/icon-144x144.png",
                "assets/images/icons/icon-192x192.png",
                "assets/images/icons/icon-384x384.png",
                "assets/images/icons/icon-512x512.png",
                'assets/images/icons/favicon.ico',
                'client/assets/images/loader.svg'
            ],
        }),
    ],
    
});