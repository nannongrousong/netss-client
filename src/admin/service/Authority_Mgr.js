import request from 'COMMON_UTILS/request';


export const Load_User_Menus = (params) => request('/Authority_Mgr/User_Menus', params);
export const List_Role_Menus = (params) => request('/Authority_Mgr/Role_Menus', params);
export const Save_Role_Menus = (params) => request('/Authority_Mgr/Role_Menus', params, 'POST');