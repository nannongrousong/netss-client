import request from 'COMMON_UTILS/request';

export const List_Sys_Menu = (params) => request('/Sys_Mgr/Menu', params);
export const Add_Sys_Menu = (params) => request('/Sys_Mgr/Menu', params, 'POST');
export const Del_Sys_Menu = (params) => request('/Sys_Mgr/Menu', params, 'DELETE');
export const Edit_Sys_Menu = (params) => request('/Sys_Mgr/Menu', params, 'PUT');

export const List_Sys_User = (params) => request('/Sys_Mgr/User', params);
export const Add_Sys_User = (params) => request('/Sys_Mgr/User', params, 'POST');
export const Del_Sys_User = (params) => request('/Sys_Mgr/User', params, 'DELETE');
export const Edit_Sys_User = (params) => request('/Sys_Mgr/User', params, 'PUT');