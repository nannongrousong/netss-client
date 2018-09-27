import request from 'COMMON_UTILS/request';

export const listTableData = (params) => request('/Demo/Table', params);
export const addTableData = (params) => request('/Demo/Table', params, 'POST');
export const editTableData = (params) => request('/Demo/Table', params, 'PUT');
export const delTableData = (params) => request('/Demo/Table', params, 'DELETE');
