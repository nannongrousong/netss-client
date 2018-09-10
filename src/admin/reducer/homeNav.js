import { LIST_NAV_MENU, SET_NAV_MENU, LIST_NAV_TAB, SET_NAV_TAB } from 'ADMIN_ACTIONTYPE/homeNav';

let initialState = {
    navMenu: [],
    navTab: []
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case LIST_NAV_MENU:
            return state.navMenu;
        case SET_NAV_MENU:
            return { ...state, navMenu: action.data };
        case LIST_NAV_TAB:
            return state.navTab;
        case SET_NAV_TAB:
            return { ...state, navTab: action.data };
        default:
            return state;
    }
};