import { SET_SYS_MENU } from 'ADMIN_ACTIONTYPE/sysMgr';
import { Add_Sys_Menu, Del_Sys_Menu, Edit_Sys_Menu, List_Sys_Menu, } from 'ADMIN_SERVICE/Sys_Mgr';

const editMenuInfo = (editedMenu, menus) => {
    for (let i in menus) {
        if (menus[i].key == editedMenu.key) {
            menus[i] = { ...menus[i], ...editedMenu };
            return;
        }

        if (menus[i].children) {
            editMenuInfo(editedMenu, menus[i].children);
        }
    }
};

export const listSysMenu = () => async (dispatch) => {
    let resData = await List_Sys_Menu();
    dispatch({
        type: SET_SYS_MENU,
        menu: resData.Data
    });
};

export const editSysMenu = (editedMenu) => async (dispatch) => {
    let resData1 = await Edit_Sys_Menu(editedMenu);
    let resData2 = await List_Sys_Menu();

    dispatch({
        type: SET_SYS_MENU,
        menu: resData2.Data
    });
};

export const addSysMenu = (addedMenu) => async (dispatch) => {
    let resData1 = await Add_Sys_Menu(addedMenu);
    let resData2 = await List_Sys_Menu();

    dispatch({
        type: SET_SYS_MENU,
        menu: resData2.Data
    });
};

export const delSysMenu = (menuID) => async (dispatch) => {
    let resData1 = await Del_Sys_Menu(menuID);
    let resData2 = await List_Sys_Menu();

    dispatch({
        type: SET_SYS_MENU,
        menu: resData2.Data
    });
};

