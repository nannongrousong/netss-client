import { SET_SYS_MENU } from 'ADMIN_ACTIONTYPE/sysMgr';

const initialState = {
    menu: []
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case SET_SYS_MENU:
            return { ...state, menu: action.menu };
        default:
            return state;
    }
};