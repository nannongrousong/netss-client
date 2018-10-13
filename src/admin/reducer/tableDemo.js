import { SET_DEMO_TABLE_DATA, EDIT_DEMO_TABLE_PAGE } from 'ADMIN_ACTIONTYPE/tableDemo';

const initialState = {
    //  数据
    data: [],
    //  分页信息
    pagination: {
        current: 1, 
        pageSize: 8
    }
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case SET_DEMO_TABLE_DATA:
            return { ...state, data: action.data };
        case EDIT_DEMO_TABLE_PAGE:
            return { ...state, pagination: action.pagination };
        default:
            return state;
    }
};