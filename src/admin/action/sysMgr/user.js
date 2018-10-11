import { SET_SYS_USER } from 'ADMIN_ACTIONTYPE/sysMgr';
import { List_Sys_User, Add_Sys_User, Del_Sys_User, Edit_Sys_User } from 'ADMIN_SERVICE/Sys_Mgr';

export const addSysUser = (userInfo) => async (dispatch) => {
    await Add_Sys_User(userInfo);
    await reloadData(dispatch);
};

export const delSysUser = (userID) => async (dispatch) => {
    await Del_Sys_User(userID);
    await reloadData(dispatch);
};

export const editSysUser = (userInfo) => async (dispatch) => {
    await Edit_Sys_User(userInfo);
    await reloadData(dispatch);
};

export const listSysUser = () => async (dispatch) => {
    await reloadData(dispatch);
};

const reloadData = async (dispatch) => {
    let resData = await List_Sys_User();
    dispatch({
        type: SET_SYS_USER,
        user: resData.Data
    });
};