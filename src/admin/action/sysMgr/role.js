import { SET_SYS_ROLE } from 'ADMIN_ACTIONTYPE/sysMgr';
import { List_Sys_Role, Add_Sys_Role, Del_Sys_Role, Edit_Sys_Role } from 'ADMIN_SERVICE/Sys_Mgr';

export const addSysRole = (userInfo) => async (dispatch) => {
    await Add_Sys_Role(userInfo);
    let resData = await List_Sys_Role();
    dispatch({
        type: SET_SYS_ROLE,
        role: resData.data
    });
};

export const delSysRole = (roleID) => async (dispatch) => {
    await Del_Sys_Role(roleID);
    let resData = await List_Sys_Role();
    dispatch({
        type: SET_SYS_ROLE,
        role: resData.data
    });
};

export const editSysRole = (userInfo) => async (dispatch) => {
    await Edit_Sys_Role(userInfo);
    let resData = await List_Sys_Role();
    dispatch({
        type: SET_SYS_ROLE,
        role: resData.data
    });
};

export const listSysRole = () => async (dispatch) => {
    let resData = await List_Sys_Role();
    dispatch({
        type: SET_SYS_ROLE,
        role: resData.data
    });
};