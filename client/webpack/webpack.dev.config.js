/**
 *  dev.js
 *  @author [Aisha Khoja, Keisuke Suzuki, Tommi Ann Tsuruga
 *  ](https://github.com/aishak7, https://github.com/Ks5810, https://github.com/tommi-tsuruga)
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
    devtool: 'cheap-module-source-map',
    devServer: {
        contentBase: path.resolve('./public'),
        publicPath: 'http://localhost/3000/bundles/',
        historyApiFallback: true,
        hot: true,
        host: 'localhost',
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