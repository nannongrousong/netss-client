import { LIST_SYS_MENU, EDIT_SYS_MENU, ADD_SYS_MENU } from 'ADMIN_ACTIONTYPE/sysMgr';
import { Load_Sys_Menus } from 'ADMIN_SERVICE/Authority_Mgr';

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

const addMenuInfo = (addedMenu, menus) => {
    for (let i in menus) {
        if (menus[i].key == addedMenu.parentKey) {
            delete addedMenu.parentKey;
            //  手动修改 group 节点信息
            menus[i] = {...menus[i], ...{
                type: 'group',
                path: undefined
            }};
            
            if (menus[i].children) {
                menus[i].children.push(addedMenu);
            } else {
                menus[i].children = [addedMenu];
            }
            return;
        }

        if (menus[i].children) {
            addMenuInfo(addedMenu, menus[i].children);
        }
    }
};

//  检查path是否合法，不允许重复
const checkPathValid = (operMenu, menus, isAdd) => {
    for (let menu of menus) {
        if (isAdd && menu.path == operMenu.path
            || (!isAdd && menu.path == operMenu.path && menu.key != operMenu.key)) {
            return false;
        }

        if (menu.children) {
            if (!checkPathValid(operMenu, menu.children, isAdd)) {
                return false;
            }
        }
    }

    return true;
};

export const listSysMenu = () => async (dispatch, getState) => {
    let resData = await Load_Sys_Menus();
    dispatch({
        type: LIST_SYS_MENU,
        menu: resData.data
    });
};

export const editSysMenu = (editedMenu, callBack) => (dispatch, getState) => {
    let { menu } = getState().sysMgr;
    let newMenu = JSON.parse(JSON.stringify(menu));

    if (editedMenu.type == 'leaf' && !checkPathValid(editedMenu, newMenu)) {
        return callBack && callBack(false);
    }

    editMenuInfo(editedMenu, newMenu);

    dispatch({
        type: EDIT_SYS_MENU,
        menu: newMenu
    });

    callBack && callBack(true);
};

export const addSysMenu = (addedMenu, callBack) => (dispatch, getState) => {
    let { menu } = getState().sysMgr;
    let newMenu = JSON.parse(JSON.stringify(menu));

    if (addedMenu.type == 'leaf' && !checkPathValid(addedMenu, newMenu, true)) {
        return callBack && callBack(false);
    }

    addedMenu.key = new Date().getTime();
    addMenuInfo(addedMenu, newMenu);

    dispatch({
        type: ADD_SYS_MENU,
        menu: newMenu
    });

    callBack && callBack(true);
};