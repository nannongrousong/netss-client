import { LIST_SYS_MENU, EDIT_SYS_MENU, ADD_SYS_MENU } from 'ADMIN_ACTIONTYPE/sysMgr';

const initialState = [

];

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case LIST_SYS_MENU:
        case EDIT_SYS_MENU:
        case ADD_SYS_MENU:
            return { ...state, menu: action.menu };
        default:
            return state;
    }
};