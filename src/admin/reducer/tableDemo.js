import { SET_DATA } from 'ADMIN_ACTIONTYPE/tableDemo';

const initialState = {
    tableData: []
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case SET_DATA:
            return { ...state, tableData: action.data };
        default:
            return state;
    }
};