const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        index: './src/js/index.js',
        shared: './src/js/shared.js',
        list: './src/js/list.js',
        forecast: './src/js/forecast.js',
        about: './src/js/about.js'
    },

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: 'css-hot-loader',
                    },
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,  
                use: [{
                    loader: 'file-loader',
                }]
            },
        ]
    },
    plugins: [
        //new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                {from: 'src/images/icons', to: 'images'}
            ]
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }), 
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: '!!ejs-webpack-loader!./index.ejs',
            chunks: ['shared','index']
        }),
        new HtmlWebpackPlugin({
            filename: 'list.html',
            template: '!!ejs-webpack-loader!./list.ejs',
            chunks: ['shared','list']
        }),
        new HtmlWebpackPlugin({
            filename: 'forecast.html',
            template: '!!ejs-webpack-loader!./forecast.ejs',
            chunks: ['shared','forecast']
        }),
        new HtmlWebpackPlugin({
            filename: 'about.html',
            template: '!!ejs-webpack-loader!./about.ejs',
            chunks: ['shared','about']
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'build'),
        compress: true,
        writeToDisk: true,
        watchContentBase: true,
        port: 9000,
    }
};