import tableDemo from './tableDemo';
import formDemo from './formDemo';
import homeNav from './homeNav';
import authInfo from './authInfo';
import sysMgr from './sysMgr';

import { RESET_TAB_STORE } from 'ADMIN_ACTIONTYPE/homeNav';
import reduceReducers from 'reduce-reducers';

import { combineReducers } from 'redux';

const commonReducer = (state = {}, action) => {
    switch (action.type) {
        case RESET_TAB_STORE:
            return {
                ...state, ...action.storeNames.reduce((prev, curr) => {
                    prev[curr] = undefined;
                    return prev;
                }, {})
            };
        default:
            return state;
    }
};

const combineReducer = combineReducers({
    tableDemo,
    formDemo,
    authInfo,
    homeNav,
    sysMgr
});

export default reduceReducers(commonReducer, combineReducer);