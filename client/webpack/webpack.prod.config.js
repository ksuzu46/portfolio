/**
 * prod.js
 * @author [Keisuke Suzuki](https://github.com/ksuzu46)
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
            appShell: '/',
            externals: [
                "https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;700&display=swap",
                "https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;1,400&display=swap",
                "https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,700;1,700&display=swap",
            ],
        }),
    ],
    
});