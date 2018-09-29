import { SET_SYS_ROLE } from 'ADMIN_ACTIONTYPE/sysMgr';

const initialState = [];

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case SET_SYS_ROLE:
            return action.role;
        default:
            return state;
    }
};