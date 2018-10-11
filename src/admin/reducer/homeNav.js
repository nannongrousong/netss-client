import { SET_NAV_MENU, EDIT_NAV_TAB, EDIT_TAB_STORE } from 'ADMIN_ACTIONTYPE/homeNav';

let initialState = {
    navMenu: [],
    navTab: [],
    activeRoute: '',
    storeMap: {}
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case SET_NAV_MENU:
            return { ...state, navMenu: action.navMenu };
        case EDIT_NAV_TAB:
            return { ...state, ...action.data };
        case EDIT_TAB_STORE:
            return { ...state, storeMap: action.storeMap };
        default:
            return state;
    }
};