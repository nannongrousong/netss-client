import { SET_SYS_ROLE } from 'ADMIN_ACTIONTYPE/sysMgr';
import { List_Sys_Role, Add_Sys_Role, Del_Sys_Role, Edit_Sys_Role } from 'ADMIN_SERVICE/Sys_Mgr';

export const addSysRole = (userInfo) => async (dispatch) => {
    await Add_Sys_Role(userInfo);
    await reloadData(dispatch);
};

export const delSysRole = (roleID) => async (dispatch) => {
    await Del_Sys_Role(roleID);
    await reloadData(dispatch);
};

export const editSysRole = (userInfo) => async (dispatch) => {
    await Edit_Sys_Role(userInfo);
    await reloadData(dispatch);
};

export const listSysRole = () => async (dispatch) => {
    await reloadData(dispatch); 
};

const reloadData = async (dispatch) => {
    let resData = await List_Sys_Role();
    dispatch({
        type: SET_SYS_ROLE,
        role: resData.Data
    });
};