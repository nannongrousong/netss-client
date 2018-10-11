import { SET_AUTH_INFO } from 'ADMIN_ACTIONTYPE/authInfo';

export const setAuthInfo = (userInfo) => async (dispatch) => {
    dispatch({
        type: SET_AUTH_INFO,
        data: userInfo
    });
};