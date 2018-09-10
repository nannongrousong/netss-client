import { LIST_NAV_MENU, SET_NAV_MENU, LIST_NAV_TAB, SET_NAV_TAB, ACTIVE_ROUTE, IN_ACTIVE_ROUTE } from 'ADMIN_ACTIONTYPE/homeNav';

let initialState = {
    navMenu: [],
    navTab: [],
    activeRoute: ''
    /*
    navTab: [{
        key: '001',
        title: 'tab1',
        path: '/page1'
    }, {
        key: '002',
        title: 'tab2',
        path: 'page2'
    }]
    */
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
        case ACTIVE_ROUTE:
            return { ...state, ...action.data };
        case IN_ACTIVE_ROUTE:
            return { ...state, ...action.data };
        default:
            return state;
    }
};