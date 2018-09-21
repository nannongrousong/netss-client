import request from 'COMMON_UTILS/request';

export const CMS_Login = (params) => request('/Sys_Login/CMS_Login', params, true);