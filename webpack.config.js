const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const fs = require('fs');
const projectConfig = require('./project.config');
const { NODE_ENV } = process.env;
const { dev, prod, entries } = projectConfig;

const rootPath = path.resolve(__dirname, 'src');
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

let allDirs = recurReadDir(rootPath);
let webpackAlias = allDirs.reduce((previous, current) => {
    previous[current.substring(rootPath.length + 1).replace('\\', '_').toUpperCase()] = current;
    return previous;
}, {});

let webpackEntry = entries.reduce((previous, current) => {
    previous[current.name] = ['webpack-hot-middleware/client?quiet=true', path.resolve(__dirname, current.entry)];
    return previous;
}, {});

let webpackConfig = {
    mode: NODE_ENV,
    devtool: NODE_ENV == dev ? 'source-map' : '',
    entry: webpackEntry,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].js',
        //  cdn http://cdn.your.com/static
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.css', '.json'],
        alias: webpackAlias
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
                    presets: ['env', 'react', 'stage-0'],
                    plugins: [
                        //  'transform-decorators-legacy',
                        'transform-runtime',
                        //  'transform-class-properties',
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
                    use: ['css-loader', {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [require('autoprefixer')]
                        }
                    }]
                })
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'less-loader', {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [require('autoprefixer')]
                            }
                        }]
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('css/[name].[hash].css'),
        new CleanWebpackPlugin(['dist/bundle.*.js', 'dist/vendor.*.js'], {
            verbose: true,
            dry: false
        }),
        ...entries.map((item) => {
            return new HtmlWebpackPlugin({
                template: path.resolve(__dirname, item.template),
                inject: true,
                title: item.title,
                filename: item.name + '.html',
                chunks: [item.name, 'vendor'],
                chunksSortMode: "none",
                favicon: path.resolve(__dirname, item.favicon)
            });
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}

module.exports = webpackConfig;