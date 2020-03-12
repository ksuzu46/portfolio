/**
 * webpack.common.config.mjs
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */

const DotEnv = require('dotenv-webpack');
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'none',
    context: path.resolve(__dirname, '../'),
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        },
            {
            test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            use: "url-loader"
        },
            {
            test: /\.(ttf|eot|svg|gif)(\?[\s\S]+)?$/,
            use: [
                'url-loader',
            ]
          }
        ]
    },
    plugins: [
        new DotEnv(),
        new CleanWebpackPlugin()
    ]
};