import { LIST_DATA, ADD_DATA, EDIT_DATA, DEL_DATA } from '../actionType/tableDemo';

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
},{
    key: '4',
    name: '张三',
    age: 32,
    address: '北京',
    tags: ['teacher'],
}, {
    key: '5',
    name: '李四',
    age: 42,
    address: '上海',
    tags: ['student'],
}, {
    key: '6',
    name: '广州',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['doctor', 'nurse'],
}, {
    key: '7',
    name: '张三',
    age: 32,
    address: '北京',
    tags: ['teacher'],
}, {
    key: '8',
    name: '李四',
    age: 42,
    address: '上海',
    tags: ['student'],
}, {
    key: '9',
    name: '广州',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['doctor', 'nurse'],
}, {
    key: '10',
    name: '张三',
    age: 32,
    address: '北京',
    tags: ['teacher'],
}, {
    key: '11',
    name: '李四',
    age: 42,
    address: '上海',
    tags: ['student'],
}, {
    key: '12',
    name: '广州',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['doctor', 'nurse'],
}];

export default (state = initialState, action = {}) => {
    let index = action.type == EDIT_DATA && state.findIndex((val) => {
        return val.key == action.record.key;
    });

    switch (action.type) {
        case LIST_DATA:
            return state;
        case ADD_DATA:
            return [...state, action.record];
        case EDIT_DATA:
            return [...state.slice(0, index), action.record, ...state.slice(index + 1)];
        case DEL_DATA:
            return state.filter((val) => (val.key != action.key));
        default:
            return state;
    }
};