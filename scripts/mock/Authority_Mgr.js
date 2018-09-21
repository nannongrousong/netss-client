module.exports = {
    'GET /api/Authority_Mgr/Load_User_Menus': {
        code: 0,
        info: '成功',
        data: [{
            key: '1',
            title: '导航1',
            icon: 'user',
            children: [{
                key: '1-1',
                title: 'page1',
                icon: 'user',
                path: '/page1'
            }, {
                key: '1-2',
                title: 'page2',
                icon: 'user',
                path: '/page2'
            }, {
                key: '1-3',
                title: 'page3',
                icon: 'user',
                path: '/page3',
                defaultShow: true
            }]
        }, {
            key: '2',
            title: '导航2',
            icon: 'user',
            children: [{
                key: '2-1',
                title: '导航2-1',
                icon: 'user',
                path: '/2-1'
            }, {
                key: '2-2',
                title: '导航2-2',
                icon: 'user',
                path: '/2-2',
                children: [{
                    key: '2-2-1',
                    title: '导航2-2-1',
                    icon: 'user',
                    path: '/2-2-1'
                }]
            },]
        }, {
            key: '3',
            title: '导航3',
            icon: 'upload',
            path: '/3'
        }]
    }
};