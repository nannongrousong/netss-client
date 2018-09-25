import { LIST_NAV_MENU, SET_NAV_MENU, LIST_NAV_TAB, SET_NAV_TAB, ACTIVE_TAB, CLOSE_NAV_TAB, CLOSE_NAV_OTHER_TAB, CLOSE_NAV_ALL_TAB, ADD_STORE } from 'ADMIN_ACTIONTYPE/homeNav';

let initialState = {
    navMenu: [],
    navTab: [],
    activeRoute: '',
    storeMap: {}
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
        case ACTIVE_TAB:
            return { ...state, ...action.data };
        case CLOSE_NAV_TAB:
        case CLOSE_NAV_OTHER_TAB:
        case CLOSE_NAV_ALL_TAB:
            return { ...state, ...action.data };
        case ADD_STORE:
            return { ...state, ...action.data };
        default:
            return state;
    }
};