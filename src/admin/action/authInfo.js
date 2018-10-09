import { SET_AUTH_INFO } from 'ADMIN_ACTIONTYPE/authInfo';
import { errorHandle } from 'COMMON_UTILS/common';

export const setAuthInfo = (userInfo) => async (dispatch) => {
    try {
        dispatch({
            type: SET_AUTH_INFO,
            data: userInfo
        });
    } catch (err) {
        errorHandle(err);
    }
};