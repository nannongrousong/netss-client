import request from 'COMMON_UTILS/request';

export const Load_User_Menus = (params) => request('/Authority_Mgr/Load_User_Menus', params);
export const Load_Sys_Menus = (params) => request('/Authority_Mgr/Load_Sys_Menus', params);
