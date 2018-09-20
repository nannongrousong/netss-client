import { SET_NAV_MENU, SET_NAV_TAB, ACTIVE_TAB, CLOSE_NAV_TAB, CLOSE_NAV_OTHER_TAB, CLOSE_NAV_ALL_TAB } from 'ADMIN_ACTIONTYPE/homeNav';
import { Load_User_Menus } from 'ADMIN_SERVICE/Authority_Mgr';

export const setNavTab = () => async (dispatch, getState) => {
    let resData = await Load_User_Menus();
    dispatch({
        type: SET_NAV_TAB,
        data: resData.data
    });
};

export const initNavMenu = (callBack) => async (dispatch, getState) => {
    let resData = await Load_User_Menus();
    dispatch({
        type: SET_NAV_MENU,
        data: resData.data
    });

    typeof callBack == 'function' && callBack();
};

const getRouteByField = (fieldKey, fieldValue, routes) => {
    for (let i = 0; i < routes.length; i++) {
        if (routes[i][fieldKey] == fieldValue) {
            return routes[i];
        }

        if (routes[i].children) {
            let tempRes = getRouteByField(fieldKey, fieldValue, routes[i].children);
            if (tempRes) {
                return tempRes;
            }
        }
    }
};

export const setActiveTab = (fieldKey, fieldValue, callBack) => (dispatch, getState) => {
    let { navTab: oldNavTab, navMenu } = getState().homeNav;
    let navTab = oldNavTab.slice();
    let routeInfo = getRouteByField(fieldKey, fieldValue, navMenu);

    let { key, path, title } = routeInfo;

    let resTab = navTab.find((tab) => tab.key == key);

    if (!resTab) {
        navTab.push(routeInfo);
    }

    dispatch({
        type: ACTIVE_TAB,
        data: {
            activeRoute: key,
            navTab
        }
    });

    typeof callBack == 'function' && callBack(path);
};

export const closeNavTab = (routeKey, callBack) => (dispatch, getState) => {
    let { navTab: oldNavTab } = getState().homeNav;
    let newPath = '';

    let activeRoute = '';
    let tabIndex = oldNavTab.findIndex((route) => route.key == routeKey);
    // not the last one
    if (tabIndex != oldNavTab.length - 1) {
        activeRoute = oldNavTab[tabIndex + 1].key;
        newPath = oldNavTab[tabIndex + 1].path;
    } else {
        if (oldNavTab.length == 1) {
            activeRoute = '';
            newPath = '';
        } else {
            activeRoute = oldNavTab[tabIndex - 1].key;
            newPath = oldNavTab[tabIndex - 1].path;
        }
    }

    let navTab = [...oldNavTab.slice(0, tabIndex), ...oldNavTab.slice(tabIndex + 1, oldNavTab.length)];

    dispatch({
        type: CLOSE_NAV_TAB,
        data: {
            activeRoute,
            navTab
        }
    });

    typeof callBack == 'function' && callBack(newPath);
};

export const closeOtherNavTab = (routeKey) => (dispatch, getState) => {
    let { navMenu } = getState().homeNav;
    let routeInfo = getRouteByField('key', routeKey, navMenu);

    dispatch({
        type: CLOSE_NAV_OTHER_TAB,
        data: {
            activeRoute: routeKey,
            navTab: [routeInfo]
        }
    });
};

export const closeAllNavTab = () => (dispatch) => {
    dispatch({
        type: CLOSE_NAV_ALL_TAB,
        data: {
            activeRoute: '',
            navTab: []
        }
    });
};