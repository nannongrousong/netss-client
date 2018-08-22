const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const history = require('connect-history-api-fallback');
const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);
const webpackHotMiddleware = require('webpack-hot-middleware');
const httpProxyMiddleware = require('http-proxy-middleware');
const path = require('path');

app.use(history({
    verbose: true,
    rewrites: [{
        from: /^\/api\//,
        to: (context) => (context.parsedUrl.pathname)
    }]
}));

app.use(webpackDevMiddleware(compiler, {
    publicPath: '/',
    stats: 'errors-only'
}));
app.use(webpackHotMiddleware(compiler));

let argvs = process.argv.splice(2);
let argObj = argvs.reduce((prev, curr) => {
    let [k, v] = curr.split('=');
    prev[k] = v;
    return prev;
}, {});
const { mode } = argObj;

if (mode == 'proxy') {
    // proxy
    app.use('/api', httpProxyMiddleware({
        target: 'http://alpha.zxx.admin',
        changeOrigin: true
    }));
} else {
    //  mock
    const apiMocker = require('webpack-api-mocker');
    apiMocker(app, path.resolve(__dirname, 'scripts/mock/index.js'));
}

app.listen(9000, () => {
    console.log('server is running at 9000!\n');
});