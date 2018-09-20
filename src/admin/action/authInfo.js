import { SET_USER_INFO } from 'ADMIN_ACTIONTYPE/authInfo';
import { CMS_Login } from 'ADMIN_SERVICE/Sys_Login';
import { message } from 'antd';

export const loginSys = (userInfo) => async (dispatch, getState) => {
    try {
        let resData = await CMS_Login(userInfo);
        //  save userinfo into localstorage
        sessionStorage.setItem('AUTH_INFO', JSON.stringify(resData.data));
        dispatch({
            type: SET_USER_INFO,
            data: resData.data
        });
    } catch (err) {
        message.error(err.info);
        console.log(err);
    }
};