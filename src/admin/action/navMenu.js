import { SET_NAV_MENU } from '../actionType/navMenu';
import { loadMenu } from 'ADMIN_SERVICE/Authority';

export const setNavMenu = () => async (dispatch, getState) => {
    let resData = await loadMenu();
    dispatch({
        type: SET_NAV_MENU,
        data: resData
    });
};