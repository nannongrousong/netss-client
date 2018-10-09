import { SET_DATA, EIDT_PAGE } from 'ADMIN_ACTIONTYPE/tableDemo';

const initialState = {
    data: [],
    pagination: {
        current: 1, 
        pageSize: 8
    }
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case SET_DATA:
            return { ...state, data: action.data };
        case EIDT_PAGE:
            return { ...state, pagination: action.pagination };
        default:
            return state;
    }
};