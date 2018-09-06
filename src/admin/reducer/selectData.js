let initialState = {
    color: 'red'
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case 'CHANGE_COLOR':
            return { color: action.color };
        default:
            return state;
    }
};