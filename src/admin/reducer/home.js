import { LIST_MENU, SET_MENU } from 'ADMIN_ACTIONTYPE/menu';

let initialState = [];

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case LIST_MENU:
            return state;
        case SET_MENU:
            return action.data;
        default:
            return state;
    }
};