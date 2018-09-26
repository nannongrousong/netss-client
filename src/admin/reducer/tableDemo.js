import { LIST_DATA, ADD_DATA, EDIT_DATA, DEL_DATA } from 'ADMIN_ACTIONTYPE/tableDemo';

const initialState = [{
    key: '1',
    name: '张三',
    age: 32,
    address: '北京',
    tags: ['teacher'],
}, {
    key: '2',
    name: '李四',
    age: 42,
    address: '上海',
    tags: ['student'],
}, {
    key: '3',
    name: '广州',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['doctor', 'nurse'],
}];

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case LIST_DATA:
            //  feat
            return state;
        case ADD_DATA:
            return action.data;
        case EDIT_DATA:
            return action.data;
        case DEL_DATA:
            return action.data;
        default:
            return state;
    }
};