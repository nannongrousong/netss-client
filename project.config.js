module.exports = {
    port: 9000,
    dev: 'development',
    prod: 'production',
    entries: [{
        name: 'netss',
        entry: 'src/netss/index.js',
        title: '后台登录',
        template: 'src/common/index.html',
        favicon: 'src/netss/favicon.ico'
    }],
    proxy: [{
        router: '/netss/api',
        target: 'http://localhost:10001',
        pathRewrite: { '^/netss/api': '/' }
    }]
}