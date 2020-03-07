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
        filename: "bundle.js"     // No dev-build so no path needed
    },
    devtool: 'cheap-module-source-map',
    devServer: {
        contentBase: path.resolve('./public'),
        publicPath: '/bundles/',  // http:..:../bundle/[output_filename]/
        liveReload: false,        // Always turn off when HMR is enabled
        historyApiFallback: true, // Will fallback to bundle.js in memory
        hot: true,
        inline: true,
        port: 3000,
    },
    optimization: {
        noEmitOnErrors: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin({ multiStep: true })
    ]
});