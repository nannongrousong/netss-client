import { SET_DATA } from 'ADMIN_ACTIONTYPE/tableDemo';
import { addTableData, delTableData, editTableData, listTableData } from 'ADMIN_SERVICE/Demo';
import { message } from 'antd';

export const addData = (record) => async (dispatch, getState) => {
    let resData1 = await addTableData(record);
    let resData2 = await listTableData();

    dispatch({
        type: SET_DATA,
        data: resData2.data
    });
};

export const listData = () => async (dispatch) => {
    let resData = await listTableData();
    dispatch({
        type: SET_DATA,
        data: resData.data
    });
};

export const editData = (record) => async (dispatch) => {
    let resData1 = await editTableData(record);
    let resData2 = await listTableData();

    dispatch({
        type: SET_DATA,
        data: resData2.data
    });
};

export const delData = (user_id) => async (dispatch) => {
    let resData1 = await delTableData(user_id);
    let resData2 = await listTableData();

    dispatch({
        type: SET_DATA,
        data: resData2.data
    });
};