import request from 'COMMON_UTILS/request';

export const loadMenu = (params) => request('/Authority/LOAD_MENUS', params);