const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const fs = require('fs');

const rootPath = path.resolve(__dirname, 'app');
const recurReadDir = (rootPath) => {
    let dirs = [];
    let presentPathFiles = fs.readdirSync(rootPath);
    for (let fileName of presentPathFiles) {
        let filePath = path.resolve(rootPath, fileName);
        if (fs.statSync(filePath).isDirectory()) {
            dirs.push(filePath);
            dirs = dirs.concat(recurReadDir(filePath));
        }
    }
    return dirs;
}

/*
const envArgs = JSON.parse(process.env.npm_config_argv).original;
console.log(11111111111111111111111111, envArgs);


var _ = process.argv.splice(2);
console.log('传入参数：',_);

*/


let allDirs = recurReadDir(rootPath);
let resolveAlias = allDirs.reduce((previous, current) => {
    previous[current.substring(rootPath.length + 1).replace('\\', '_').toUpperCase()] = current;
    return previous;
}, {});

let webpackConfig = {
    mode: 'development',
    devtool: 'source-map',
    entry: path.resolve(__dirname, 'app', 'index.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].[hash].js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.css', '.json'],
        alias: {}
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all"
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/,
                enforce: 'pre'
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    cacheDirectory: true,
                    presets: ['env', 'react'],
                    plugins: [
                        'transform-runtime',
                        'transform-class-properties', 
                        ["import", [{ libraryName: "antd-mobile", style: "css" }, { libraryName: "antd", style: "css" }]], 
                        'syntax-dynamic-import', 
                        'react-hot-loader/babel']
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 13000,
                    name: 'images/[name].[hash].[ext]'
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: {
                        loader: 'css-loader'
                    }
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('css/[name].[hash].css'),
        new CleanWebpackPlugin(['build/bundle.*.js', 'build/vendor.*.js'], {
            verbose: true,
            dry: false
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'app', 'index.html'),
            inject: true,
            title: '第一个入口'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'build'),
        host: '127.0.0.1',
        port: 9000,
        open: true,
        inline: true,
        hot: true,
        historyApiFallback: true,
        overlay: true
    }
}

webpackConfig.resolve.alias = resolveAlias;

module.exports = webpackConfig;