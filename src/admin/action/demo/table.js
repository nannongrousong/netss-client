import { SET_DATA, EIDT_PAGE } from 'ADMIN_ACTIONTYPE/tableDemo';
import { Add_Demo_Data, Del_Demo_Data, Edit_Demo_Data, List_Demo_Data } from 'ADMIN_SERVICE/Demo';

export const addData = (record) => async (dispatch, getState) => {
    await Add_Demo_Data(record);
    await reloadData(dispatch, getState);
};

export const listData = () => async (dispatch, getState) => {
    await reloadData(dispatch, getState);
};

export const editData = (record) => async (dispatch, getState) => {
    await Edit_Demo_Data(record);
    await reloadData(dispatch, getState);
};

export const delData = (user_id) => async (dispatch, getState) => {
    await Del_Demo_Data(user_id);
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

    let resData = await List_Demo_Data(reqParam);
    dispatch({
        type: SET_DATA,
        data: resData.Data
    });
};