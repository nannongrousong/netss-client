import { SET_SYS_USER, SET_SYS_USER_PAGE } from 'ADMIN_ACTIONTYPE/sysMgr';

const initialState = {
    //  数据
    data: [],
    //  分页信息
    pagination: {}
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case SET_SYS_USER:
            return { ...state, data: action.user };
        case SET_SYS_USER_PAGE:
            return { ...state, pagination: action.pagination };
        default:
            return state;
    }
};