/**
 * 存储用户信息
 */

import { SET_AUTH_INFO } from 'ADMIN_ACTIONTYPE/authInfo';

let initialState = {
    
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case SET_AUTH_INFO:
            return action.data;
        default:
            return state;
    }
};