import { SET_SYS_MENU } from 'ADMIN_ACTIONTYPE/sysMgr';
import { Add_Sys_Menu, Del_Sys_Menu, Edit_Sys_Menu, List_Sys_Menu, } from 'ADMIN_SERVICE/Sys_Mgr';

export const listSysMenu = () => async (dispatch) => {
    await reloadData(dispatch);
};

export const editSysMenu = (editedMenu) => async (dispatch) => {
    await Edit_Sys_Menu(editedMenu);
    await reloadData(dispatch);
};

export const addSysMenu = (addedMenu) => async (dispatch) => {
    await Add_Sys_Menu(addedMenu);
    await reloadData(dispatch);
};

export const delSysMenu = (menuID) => async (dispatch) => {
    await Del_Sys_Menu(menuID);
    await reloadData(dispatch);
};

const reloadData = async (dispatch) => {
    let resData = await List_Sys_Menu();

    dispatch({
        type: SET_SYS_MENU,
        menu: resData.Data
    });
};