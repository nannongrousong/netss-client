import { SET_DATA, EIDT_PAGE } from 'ADMIN_ACTIONTYPE/tableDemo';
import { addTableData, delTableData, editTableData, listTableData } from 'ADMIN_SERVICE/Demo';

export const addData = (record) => async (dispatch, getState) => {
    await addTableData(record);
    await reloadData(dispatch, getState);
};

export const listData = () => async (dispatch, getState) => {
    await reloadData(dispatch, getState);
};

export const editData = (record) => async (dispatch, getState) => {
    await editTableData(record);
    await reloadData(dispatch, getState);
};

export const delData = (user_id) => async (dispatch, getState) => {
    await delTableData(user_id);
    await reloadData(dispatch, getState);
};

export const editPage = (current, pageSize) => async (dispatch, getState) => {
    const pagination = { current, pageSize };
    dispatch({
        type: EIDT_PAGE,
        pagination
    });

    await reloadData(dispatch, getState);
};

const reloadData = async (dispatch, getState) => {
    const { tableDemo: { pagination: { current, pageSize } } } = getState();
    let reqParam = {
        index: (current - 1) * pageSize,
        size: pageSize
    };

    let resData = await listTableData(reqParam);
    dispatch({
        type: SET_DATA,
        data: resData.Data
    });
};