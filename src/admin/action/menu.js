import { SET_MENU } from 'ADMIN_ACTIONTYPE/menu';
import { loadMenu } from 'ADMIN_SERVICE/Authority';

export const setMenu = () => async (dispatch, getState) => {
    let resData = await loadMenu();
    dispatch({
        type: SET_MENU,
        data: resData
    });
};