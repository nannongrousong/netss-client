import { SET_NAV_MENU, SET_NAV_TAB, ACTIVE_ROUTE, IN_ACTIVE_ROUTE } from 'ADMIN_ACTIONTYPE/homeNav';
import { loadMenu } from 'ADMIN_SERVICE/Authority';

export const setNavTab = () => async (dispatch, getState) => {
    let resData = await loadMenu();
    dispatch({
        type: SET_NAV_TAB,
        data: resData
    });
};

export const initNavMenu = (callBack) => async (dispatch, getState) => {
    let resData = await loadMenu();
    dispatch({
        type: SET_NAV_MENU,
        data: resData
    });
    if(typeof callBack == 'function') {
        callBack();
    }
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

export const setActiveRoute = (fieldKey, fieldValue, callBack) => (dispatch, getState) => {
    debugger;

    let { navTab: oldNavTab, navMenu } = getState().homeNav;
    let navTab = oldNavTab.slice();
    let routeInfo = getRouteByField(fieldKey, fieldValue, navMenu);

    let { key, path, title } = routeInfo;

    let resTab = navTab.find((tab) => tab.key == key);

    if (!resTab) {
        navTab.push(routeInfo);
    }

    dispatch({
        type: ACTIVE_ROUTE,
        data: {
            activeRoute: key,
            navTab
        }
    });

    if (typeof callBack == 'function') {
        callBack(path);
    }
};

export const inActiveRoute = (routeKey, callBack) => (dispatch, getState) => {
    let { navTab: oldNavTab } = getState().homeNav;
    let newPath = '';

    //  left only one tab
    if (oldNavTab.length == 1) {
        return;
    }

    let activeRoute = '';
    let tabIndex = oldNavTab.findIndex((route) => route.key == routeKey);
    // not the last one
    if (tabIndex != oldNavTab.length - 1) {
        activeRoute = oldNavTab[tabIndex + 1].key;
        newPath = oldNavTab[tabIndex + 1].path;
    } else {
        activeRoute = oldNavTab[tabIndex - 1].key;
        newPath = oldNavTab[tabIndex - 1].path;
    }

    let navTab = [...oldNavTab.slice(0, tabIndex), ...oldNavTab.slice(tabIndex + 1, oldNavTab.length)];

    dispatch({
        type: IN_ACTIVE_ROUTE,
        data: {
            activeRoute,
            navTab
        }
    });

    if (typeof callBack == 'function') {
        callBack(newPath);
    }
};