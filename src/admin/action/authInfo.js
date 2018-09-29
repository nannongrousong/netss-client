import { SET_AUTH_INFO } from 'ADMIN_ACTIONTYPE/authInfo';
import { CMS_Login } from 'ADMIN_SERVICE/Sys_Login';
import { errorHandle } from 'COMMON_UTILS/common';

export const cmsLogin = (userInfo, callBack) => async (dispatch, getState) => {
    try {
        let resData = await CMS_Login(userInfo);
        //  save userinfo into localstorage
        sessionStorage.setItem('AUTH_INFO', resData.data.token);
        dispatch({
            type: SET_AUTH_INFO,
            data: resData.data
        });

        typeof callBack == 'function' && callBack();
    } catch (err) {
        errorHandle(err);
    }
};