const path = require('path');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const fs = require('fs');
const projectConfig = require('./project.config');
const { NODE_ENV } = process.env;
const { dev, prod, entries } = projectConfig;
const pathSep = path.sep;

//  webpack alias
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

let jsconfigPaths = {};
let allDirs = recurReadDir(rootPath);
let webpackAlias = allDirs.reduce((previous, current) => {
    let key = current.substring(rootPath.length + 1).split(pathSep).join('_').toUpperCase();    
    previous[key] = current;
    jsconfigPaths[key + '/*'] = [current + pathSep + '*'];
    return previous;
}, {});

//  write webpack alias into jsconfig.json for vscode intellisense
let jsconfigContent = require('./jsconfig.json');
jsconfigContent.compilerOptions.paths = jsconfigPaths;
fs.writeFileSync(path.resolve(__dirname, 'jsconfig.json'), JSON.stringify(jsconfigContent));

let webpackEntry = entries.reduce((previous, current) => {
    previous[current.name] = ['webpack-hot-middleware/client?quiet=true&reload=true', path.resolve(__dirname, current.entry)];
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
            chunks: 'all',
            cacheGroups: {
                commons: {
                    test: /node_modules/,
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
                        'transform-decorators-legacy',
                        'transform-runtime',
                        ["import", [{ libraryName: "antd-mobile", style: "css" }, { libraryName: "antd", style: "css" }]],
                        'syntax-dynamic-import',
                        'react-hot-loader/babel']
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg|bmp)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: 'images/[name].[hash].[ext]'
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    MiniCSSExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true,
                            localIdentName: '[name]_[local]_[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [require('autoprefixer')]
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                include: /node_modules/,
                use: [
                    MiniCSSExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [
                    MiniCSSExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            modules: true,
                            localIdentName: '[name]_[local]_[hash:base64:5]'
                        }
                    },
                    'less-loader?javascriptEnabled=true',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [require('autoprefixer')]
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                include: /node_modules/,
                use: [
                    MiniCSSExtractPlugin.loader,
                    'css-loader?importLoaders=1',
                    'less-loader?javascriptEnabled=true'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: 'file-loader'
            },
        ]
    },
    plugins: [
        new MiniCSSExtractPlugin({
            filename: 'css/[name].[hash].css',
            chunkFilename: 'css/[name].[chunkhash].chunk.css'
        }),
        new CleanWebpackPlugin(['dist/*'], {
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