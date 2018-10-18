/**
 * 存储导航、tab页信息
 */

import { SET_NAV_MENU, EDIT_NAV_TAB, EDIT_TAB_STORE } from 'NETSS_ACTIONTYPE/homeNav';

let initialState = {
    //  用户已授权菜单列表
    navMenu: [],
    //  当前可见tab页
    navTab: [],
    //  当前激活路由
    activeRoute: '',
    //  路径path和redux中stroe对应关系，用于切换tab页时数据恢复和关闭tab页时清空数据
    storeMap: {}
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case SET_NAV_MENU:
            return { ...state, navMenu: action.navMenu };
        case EDIT_NAV_TAB:
            return { ...state, ...action.data };
        case EDIT_TAB_STORE:
            return { ...state, storeMap: action.storeMap };
        default:
            return state;
    }
};