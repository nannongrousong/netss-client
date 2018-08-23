// resolve arguments
let argvs = process.argv.splice(2);
let argObj = argvs.reduce((prev, curr) => {
    let [k, v] = curr.split('=');
    prev[k] = v;
    return prev;
}, {});
const { mode, env = 'development' } = argObj;
process.env.NODE_ENV = env;

const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

if (env == 'development') {
    const express = require('express');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const history = require('connect-history-api-fallback');
    const app = express();
    const compiler = webpack(webpackConfig);
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const path = require('path');

    // use:https://www.npmjs.com/package/connect-history-api-fallback#introduction
    app.use(history({
        //  whether show log 
        verbose: false,
        rewrites: [{
            //  filter http GET where url startwith 'api'
            from: /^\/api\//,
            to: (context) => (context.parsedUrl.pathname)
        }]
    }));

    app.use(webpackDevMiddleware(compiler, {
        publicPath: '/',
        stats: 'errors-only'
    }));

    app.use(webpackHotMiddleware(compiler));

    if (mode == 'proxy') {
        // proxy
        const httpProxyMiddleware = require('http-proxy-middleware');
        app.use('/api', httpProxyMiddleware({
            target: 'http://alpha.zxx.admin',
            changeOrigin: true,
            //  pathRewrite: { '^/api': '/' }
        }));
    } else {
        //  mock
        const apiMocker = require('webpack-api-mocker');
        apiMocker(app, path.resolve(__dirname, 'scripts/mock/index.js'));
    }

    app.listen(9000, () => {
        console.log('server is running at 9000!\n');
    });
} else {
    //  build directly
    webpack(webpackConfig, (err, stats) => {
        if (err || stats.hasErrors()) {
            console.log('webpack error!', err ? err : stats);
            return;
        }
        console.log('webpack success!');
    })
}