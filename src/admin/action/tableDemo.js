import { ADD_DATA, LIST_DATA, EDIT_DATA, DEL_DATA } from 'ADMIN_ACTIONTYPE/tableDemo';

export const addData = (record) => (dispatch, getState) => {
    let oldList = getState().tableDemo;
    dispatch({
        type: ADD_DATA,
        data: [...oldList, record]
    });
};

export const listData = () => (dispatch, getState) => {
    dispatch({
        type: LIST_DATA
    });
};

export const editData = (record) => (dispatch, getState) => {
    let oldList = getState().tableDemo;

    let index = oldList.findIndex((val) => {
        return val.key == record.key;
    });

    dispatch({
        type: EDIT_DATA,
        data: [...oldList.slice(0, index), record, ...oldList.slice(index + 1)]
    });
};

export const delData = (key) => (dispatch, getState) => {
    let oldList = getState().tableDemo;

    dispatch({
        type: DEL_DATA,
        data: oldList.filter((val) => (val.key != key))
    });
};