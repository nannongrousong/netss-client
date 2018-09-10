import { LIST_NAV_MENU, SET_NAV_MENU } from '../actionType/navMenu';

let initialState = [];

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case LIST_NAV_MENU:
            return state;
        case SET_NAV_MENU:
            return action.data;
        default:
            return state;
    }
};