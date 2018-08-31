module.exports = {
    port: 9000,
    dev: 'development',
    prod: 'production',
    entries: [{
        name: 'admin',
        entry: 'src/admin/index.js',
        title: '后台登录',
        template: 'src/common/index.html',
        favicon: 'src/admin/favicon.ico'
    }, {
        name: 'app',
        entry: 'src/app/index.js',
        title: 'XX管理系统',
        template: 'src/common/index.html',
        favicon: 'src/app/favicon.ico'
    }]
}