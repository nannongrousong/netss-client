// resolve arguments
let argvs = process.argv.splice(2);
let argObj = argvs.reduce((prev, curr) => {
    let [k, v] = curr.split('=');
    prev[k] = v;
    return prev;
}, {});

const webpack = require('webpack');
const projectConfig = require('../project.config');
const { port, dev, prod } = projectConfig;
const { mode, env = dev } = argObj;
process.env.NODE_ENV = env;
const webpackConfig = require('../webpack.config');

if (env == dev) {
    const express = require('express');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const history = require('connect-history-api-fallback');
    const app = express();
    const compiler = webpack(webpackConfig);
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const path = require('path');
    const open = require('opn');

    // use:https://www.npmjs.com/package/connect-history-api-fallback#introduction
    app.use(history({
        //  whether show log 
        verbose: false,
        rewrites: [{
            //  filter http GET where url startwith 'api'
            from: /^\/api\//,
            to: (context) => (context.parsedUrl.pathname)
        }, ...projectConfig.entries.map((item) => {
            return {
                from: new RegExp(`^\/${item.name}\/`),
                to: `/${item.name}.html`
            }
        })]
    }));

    app.use(webpackDevMiddleware(compiler, {
        publicPath: '/',
        stats: 'errors-only'
        //  stats: 'verbose' // all info
    }));

    app.use(webpackHotMiddleware(compiler));

    if (mode == 'proxy') {
        // proxy
        const httpProxyMiddleware = require('http-proxy-middleware');
        projectConfig.proxy.forEach((prox) => {
            app.use(prox.router, httpProxyMiddleware({
                target: prox.target,
                changeOrigin: true,
                pathRewrite: prox.pathRewrite
            }))
        });
    } else {
        //  mock
        const apiMocker = require('webpack-api-mocker');
        apiMocker(app, path.resolve(__dirname, 'mock/index.js'));
    }

    app.listen(port, () => {
        console.log(`server is running at ${port}!\n`);
        open(`http://localhost:${port}`);
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