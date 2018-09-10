import { SET_NAV_MENU, SET_NAV_TAB } from 'ADMIN_ACTIONTYPE/homeNav';
import { loadMenu } from 'ADMIN_SERVICE/Authority';

export const setNavTab= () => async (dispatch, getState) => {
    let resData = await loadMenu();
    dispatch({
        type: SET_NAV_TAB,
        data: resData
    });
};

export const setNavMenu = () => async (dispatch, getState) => {
    let resData = await loadMenu();
    dispatch({
        type: SET_NAV_MENU,
        data: resData
    });
};