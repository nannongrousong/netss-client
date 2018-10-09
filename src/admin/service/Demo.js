import request from 'COMMON_UTILS/request';

export const List_Demo_Data = (params) => request('/Demo/Table', params);
export const Add_Demo_Data = (params) => request('/Demo/Table', params, 'POST');
export const Edit_Demo_Data = (params) => request('/Demo/Table', params, 'PUT');
export const Del_Demo_Data = (params) => request('/Demo/Table', params, 'DELETE');
