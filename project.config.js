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
        //  拦截的路由
        router: '/netss/api',
        //  目标服务器
        target: 'http://localhost:10001',
        //  路由重写规则
        pathRewrite: { '^/netss/api': '/' }
    }]
}