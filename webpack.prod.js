const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        game: './src/game.ts'
    },
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: './',
        filename: '[name].min.js'
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader'
            },
            {
                test: [ /\.vert$/, /\.frag$/ ],
                use: 'raw-loader'
            },
            {
                test: /\.(gif|png|jpe?g|svg|xml)$/i,
                use: "file-loader"
            }
        ]
    },
    optimization: {
        minimize: true,
        splitChunks: {
            cacheGroups: {
                commons: { 
                    test: /[\\/]node_modules[\\/]/, 
                    name: "vendors", 
                    chunks: "all" 
                }
            }
        }
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
        plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })]
    },
    stats: false,
    plugins: [
        new webpack.DefinePlugin({
            'typeof SHADER_REQUIRE': JSON.stringify(false),
            'typeof CANVAS_RENDERER': JSON.stringify(true),
            'typeof WEBGL_RENDERER': JSON.stringify(true)
        }),
        new CopyWebpackPlugin(
        [
            {
                from: './app.css',
                to: './app.css',
                force: true
            },
            {
                from: './dogicapixel.ttf',
                to: './dogicapixel.ttf',
                force: true
            }
        ]),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html'
        })
    ]
};