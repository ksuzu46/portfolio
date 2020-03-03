/**
 * prod.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.config');

module.exports = merge(common, {
    mode: 'production',
    entry: './src/app.js',
    output: {
        path: path.resolve('./public', 'bundles'),
        filename: "bundle.js"
    },
    devtool: 'source-map',
    optimization: {
        nodeEnv: 'production',
        minimize: true
    },
    plugins: [
        new webpack.optimize.AggressiveMergingPlugin()
    ]
});