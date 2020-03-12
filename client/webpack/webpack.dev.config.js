/**
 *  dev.js
 *  @author [Keisuke Suzuki](https://github.com/Ks5810)
 */

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.config.js');

module.exports = merge(common, {
    mode: 'development',
    entry: [
        './src/app.js'
    ],
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist', 'bundles')
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
        contentBase: path.join(__dirname, 'dist'),
        publicPath: '/bundles/',  // http:..:../bundles/[output_filename]/
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
        new webpack.HotModuleReplacementPlugin({ multiStep: true }),
    ]
});