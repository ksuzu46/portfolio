/**
 *  dev.js
 *  @author [Keisuke Suzuki](https://github.com/Ks5810)
 */

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.config.js');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    mode: 'development',
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
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
        publicPath: '/',  // http:..:../[output_filename]/
        liveReload: false,        // Always turn off when HMR is enabled
        historyApiFallback: true, // Will fallback to bundle.js in memory
        hot: true,
        inline: true,
        port: 3000,
        proxy: {
            '/api/gh': 'http://localhost:4444',
            '/api/mailer': 'http://localhost:4444'
        }
    },
    optimization: {
        nodeEnv: 'development',
        noEmitOnErrors: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new htmlWebpackPlugin({
            inject: false,
            template: require('html-webpack-template'),
            appMountId: 'app',
            headHtmlSnippet: '<title>Keisuke Suzuki</title>',
            // googleAnalytics: {
            //     trackingId: 'UA-160643958-1',
            //     pageViewOnLoad: true
            // },
            meta: [
                {
                    charset: 'UTF-8'
                },
                {
                    name: 'name',
                    content: 'portfolio'
                }, {
                    name: 'Description',
                    content: 'My portfolio site',
                }, {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1,' +
                             ' shrink-to-fit=yes',
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
                    sizes: '180x180',
                    href: "./src/assets/images/icons/apple-touch-icon.png"
                }, {
                    rel: 'manifest',
                    href: './manifest.json'
                }
            ],
            mobile: true,
            lang: 'en-US',
            favicon: './src/assets/images/icons/favicon.ico',
            title: 'Keisuke Suzuki',
        })
    ]
});