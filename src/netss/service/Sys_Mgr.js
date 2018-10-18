import request from 'COMMON_UTILS/request';

export const List_Sys_Menu = (params) => request('/Sys_Mgr/Menu', params);
export const Add_Sys_Menu = (params) => request('/Sys_Mgr/Menu', params, 'POST');
export const Del_Sys_Menu = (params) => request('/Sys_Mgr/Menu', params, 'DELETE');
export const Edit_Sys_Menu = (params) => request('/Sys_Mgr/Menu', params, 'PUT');

export const List_Sys_User = (params) => request('/Sys_Mgr/User', params);
export const Add_Sys_User = (params) => request('/Sys_Mgr/User', params, 'POST');
export const Del_Sys_User = (params) => request('/Sys_Mgr/User', params, 'DELETE');
export const Edit_Sys_User = (params) => request('/Sys_Mgr/User', params, 'PUT');
export const Rest_Sys_User_Pwd = (params) => request('/Sys_Mgr/User/Reset_Pwd', params, 'PUT');
export const Edit_Sys_User_Pwd = (params) => request('/Sys_Mgr/User/Edit_Pwd', params, 'POST');

export const List_Sys_Role = (params) => request('/Sys_Mgr/Role', params);
export const Add_Sys_Role = (params) => request('/Sys_Mgr/Role', params, 'POST');
export const Del_Sys_Role = (params) => request('/Sys_Mgr/Role', params, 'DELETE');
export const Edit_Sys_Role = (params) => request('/Sys_Mgr/Role', params, 'PUT');

export const List_Role_Menus = (params) => request('/Sys_Mgr/Role_Menu', params);
export const Save_Role_Menus = (params) => request('/Sys_Mgr/Role_Menu', params, 'POST');