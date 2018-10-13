import reduceReducers from 'reduce-reducers';
import { combineReducers } from 'redux';

import tableDemo from './tableDemo';
import formDemo from './formDemo';
import homeNav from './homeNav';
import authInfo from './authInfo';
import sysUser from './sysUser';
import sysMenu from './sysMenu';
import sysRole from './sysRole';
import { RESET_TAB_STORE } from 'ADMIN_ACTIONTYPE/homeNav';

const getStoreNames = (paths, storeMap) => {
    let storeNames = [];
    paths.forEach((path) => {
        storeMap[path] && storeNames.push(storeMap[path].storeName);
    });
    return storeNames;
};

const commonReducer = (state = {}, action) => {
    if (action.type == RESET_TAB_STORE) {
        const { storeMap } = state.homeNav;
        const { storePaths } = action;
        let storeNames = getStoreNames(storePaths, storeMap);
        let newStoreMap = JSON.parse(JSON.stringify(storeMap));
        storePaths.forEach((path) => {
            delete newStoreMap[path];
        });

        //  根据path清空store。注意查看store树级解构
        return {
            ...state, ...storeNames.reduce((prev, curr) => {
                prev[curr] = undefined;
                return prev;
            }, {}), homeNav: {
                ...state.homeNav,
                storeMap: newStoreMap
            }
        };
    } else {
        return state;
    }
};

const combineReducer = combineReducers({
    tableDemo,
    formDemo,
    authInfo,
    homeNav,
    sysUser,
    sysMenu,
    sysRole
});

export default reduceReducers(commonReducer, combineReducer);