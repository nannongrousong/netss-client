module.exports = {
    'GET /api/Authority_Mgr/Load_User_Menus': {
        code: 0,
        info: '成功',
        data: [{
            key: '1',
            type: 'group',
            title: 'Antdesign Demo',
            icon: 'star',
            children: [{
                key: '1-1',
                type: 'leaf',
                title: '数据表事例',
                icon: 'tag',
                path: '/demo/table'
            }, {
                key: '1-2',
                type: 'leaf',
                title: '表单事例',
                icon: 'tag',
                path: '/demo/form'
            }, {
                key: '1-3',
                type: 'leaf',
                title: '图表事例',
                icon: 'tag',
                path: '/demo/chart',
                defaultShow: true
            }]
        }, {
            key: '2',
            type: 'group',
            title: '系统管理',
            icon: 'dashboard',
            children: [{
                key: '2-1',
                type: 'leaf',
                title: '菜单配置',
                icon: 'tag',
                path: '/sysMgr/menu'
            }]
        }]
    }, 
    'GET /api/Authority_Mgr/Load_Sys_Menus': {
        code: 0,
        info: '成功',
        data: [{
            key: '1',
            type: 'group',
            title: 'Antdesign Demo',
            icon: 'star',
            children: [{
                key: '1-1',
                type: 'leaf',
                title: '数据表事例',
                icon: 'tag',
                path: '/demo/table'
            }, {
                key: '1-2',
                type: 'leaf',
                title: '表单事例',
                icon: 'tag',
                path: '/demo/form'
            }, {
                key: '1-3',
                type: 'leaf',
                title: '图表事例',
                icon: 'tag',
                path: '/demo/chart',
                defaultShow: true
            }]
        }, {
            key: '2',
            type: 'group',
            title: '系统管理',
            icon: 'dashboard',
            children: [{
                key: '2-1',
                type: 'leaf',
                title: '菜单配置',
                icon: 'tag',
                path: '/sysMgr/menu'
            }]
        }]
    }
};