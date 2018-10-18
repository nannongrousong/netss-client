import request from 'COMMON_UTILS/request';

export const CMS_Login = (params) => request('/Sys_Auth/CMS_Login', params, 'POST');

export const Load_User_Info = (params) => request('/Sys_Auth/Load_User_Info', params);