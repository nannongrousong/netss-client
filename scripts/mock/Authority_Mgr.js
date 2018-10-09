module.exports = {
    'GET /api/Authority_Mgr/Load_User_Menus': {
        Code: 0,
        Info: '成功',
        Data: [{
            menu_id: '1',
            type: 'group',
            title: 'Antdesign Demo',
            icon: 'star',
            children: [{
                menu_id: '1-1',
                type: 'leaf',
                title: '数据表事例',
                icon: 'tag',
                path: '/demo/table'
            }, {
                menu_id: '1-2',
                type: 'leaf',
                title: '表单事例',
                icon: 'tag',
                path: '/demo/form'
            }, {
                menu_id: '1-3',
                type: 'leaf',
                title: '图表事例',
                icon: 'tag',
                path: '/demo/chart',
                defaultShow: true
            }]
        }, {
            menu_id: '2',
            type: 'group',
            title: '系统管理',
            icon: 'dashboard',
            children: [{
                menu_id: '2-1',
                type: 'leaf',
                title: '菜单配置',
                icon: 'tag',
                path: '/sysMgr/menu'
            }]
        }]
    }, 
    'GET /api/Authority_Mgr/Load_Sys_Menus': {
        Code: 0,
        Info: '成功',
        Data: [{
            menu_id: '1',
            type: 'group',
            title: 'Antdesign Demo',
            icon: 'star',
            children: [{
                menu_id: '1-1',
                type: 'leaf',
                title: '数据表事例',
                icon: 'tag',
                path: '/demo/table'
            }, {
                menu_id: '1-2',
                type: 'leaf',
                title: '表单事例',
                icon: 'tag',
                path: '/demo/form'
            }, {
                menu_id: '1-3',
                type: 'leaf',
                title: '图表事例',
                icon: 'tag',
                path: '/demo/chart',
                defaultShow: true
            }]
        }, {
            menu_id: '2',
            type: 'group',
            title: '系统管理',
            icon: 'dashboard',
            children: [{
                menu_id: '2-1',
                type: 'leaf',
                title: '菜单配置',
                icon: 'tag',
                path: '/sysMgr/menu'
            }]
        }]
    }
};