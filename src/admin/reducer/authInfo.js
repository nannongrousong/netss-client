import { SET_USER_INFO } from 'ADMIN_ACTIONTYPE/authInfo';

let initialState = {
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case SET_USER_INFO:
            return action.data;
        default:
            return state;
    }
};