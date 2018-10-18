import { SAVE_FORM_CHANGES } from 'NETSS_ACTIONTYPE/formDemo';

const initialState = {

};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case SAVE_FORM_CHANGES:
            return action.data;
        default:
            return state;
    }
};