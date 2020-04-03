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
    entry: {
        app: './src/index.js'
    },
    output: {
        publicPath: '/',
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
        noEmitOnErrors: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ]
});