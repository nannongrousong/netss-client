import { SET_NAV_MENU, EDIT_NAV_TAB, EDIT_TAB_STORE, RESET_TAB_STORE } from 'ADMIN_ACTIONTYPE/homeNav';

export const initNavMenu = (initPath, navMenu, callBack) => async (dispatch) => {
    dispatch({
        type: SET_NAV_MENU,
        navMenu
    });

    let routeInfo = null;

    if (initPath == '/index') {
        routeInfo = getFirstShowPage(navMenu) || _firstValidPath;
        _firstValidPath = null;
    } else {
        routeInfo = getRouteInfo(initPath, navMenu);
    }

    let activeRoute = routeInfo ? routeInfo.Path : '/404';
    document.title = routeInfo ? routeInfo.Title : document.title;

    dispatch({
        type: EDIT_NAV_TAB,
        data: {
            activeRoute,
            navTab: routeInfo ? [routeInfo] : []
        }
    });

    typeof callBack == 'function' && callBack(activeRoute);
};

const getRouteInfo = (path, routes) => {
    for (let i = 0; i < routes.length; i++) {
        if (routes[i]['Path'] == path) {
            return routes[i];
        }

        if (routes[i].Children) {
            let tempRes = getRouteInfo(path, routes[i].Children);
            if (tempRes) {
                return tempRes;
            }
        }
    }
};

//  找第一个显示的tab页，若没有设置，则取第一个有效的path。defaultShow暂不支持.....
let _firstValidPath = null;
const getFirstShowPage = (routes) => {
    for (let i = 0; i < routes.length; i++) {
        if (!_firstValidPath && routes[i].Path) {
            _firstValidPath = routes[i];
        }

        if (routes[i] && routes[i].defaultShow) {
            return routes[i];
        }

        if (routes[i].children) {
            let tempRes = getFirstShowPage(routes[i].children);
            if (tempRes && tempRes.defaultShow) {
                return tempRes;
            }
        }
    }
};

export const setActiveTab = (tabPath, callBack) => (dispatch, getState) => {
    let { navTab, navMenu, activeRoute } = getState().homeNav;
    let routeInfo = getRouteInfo(tabPath, navMenu);

    if (!routeInfo || activeRoute == tabPath) {
        return;
    }

    let { Path, Title } = routeInfo;
    document.title = Title;

    let resTab = navTab.find((tab) => tab.Path == Path);

    dispatch({
        type: EDIT_NAV_TAB,
        data: {
            activeRoute: Path,
            navTab: !resTab ? [...navTab, routeInfo] : navTab
        }
    });

    typeof callBack == 'function' && callBack(Path);
};

export const closeNavTab = (tabPath, callBack) => (dispatch, getState) => {
    let { navTab, activeRoute } = getState().homeNav;
    let newPath = '';
    let tabIndex = navTab.findIndex((route) => route.Path == tabPath);

    //  关闭的是当前激活的
    if (tabPath == activeRoute) {
        if (tabIndex == navTab.length - 1) {
            //  当前激活的是最后一个tab页，取相邻左边一个
            //  考虑仅剩下一个情况
            newPath = (navTab.length == 1) ? '' : navTab[tabIndex - 1].Path;
        } else {
            //  当前激活的非最后一个tab页，取相邻右边一个
            newPath = navTab[tabIndex + 1].Path;
        }
    } else {
        newPath = activeRoute;
    }

    dispatch({
        type: EDIT_NAV_TAB,
        data: {
            activeRoute: newPath,
            navTab: [...navTab.slice(0, tabIndex), ...navTab.slice(tabIndex + 1, navTab.length)]
        }
    });

    resetTabStore([tabPath], dispatch);

    typeof callBack == 'function' && callBack(newPath);
};

export const closeOtherNavTab = (tabPath) => (dispatch, getState) => {
    let { navMenu, navTab } = getState().homeNav;
    let routeInfo = getRouteInfo(tabPath, navMenu);

    dispatch({
        type: EDIT_NAV_TAB,
        data: {
            activeRoute: tabPath,
            navTab: [routeInfo]
        }
    });

    let storePaths = [];
    navTab.forEach((tab) => {
        if (tab.Path != tabPath) {
            storePaths.push(tab.Path);
        }
    });

    resetTabStore(storePaths, dispatch);
};

export const closeAllNavTab = () => (dispatch, getState) => {
    let { navTab } = getState().homeNav;
    let storePaths = navTab.map((tab) => (tab.Path));

    dispatch({
        type: EDIT_NAV_TAB,
        data: {
            activeRoute: '',
            navTab: []
        }
    });

    resetTabStore(storePaths, dispatch);
};

export const editTabStore = (path, storeName) => (dispatch, getState) => {
    const { storeMap } = getState().homeNav;
    if (!(storeMap[path] && !storeMap[path].firstIn)) {
        dispatch({
            type: EDIT_TAB_STORE,
            storeMap: { ...storeMap, [path]: { storeName, firstIn: !storeMap[path] } }
        });
    }
};

const resetTabStore = (storePaths, dispatch) => {
    dispatch({
        type: RESET_TAB_STORE,
        storePaths
    });
};