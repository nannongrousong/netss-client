import { SAVE_CHANGES } from 'ADMIN_ACTIONTYPE/formDemo';

const initialState = {

};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case SAVE_CHANGES:
            return action.data;
        default:
            return state;
    }
};