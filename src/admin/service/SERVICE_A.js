import request from 'ADMIN_UTILS/request';

export const serviceAPostData = (params) => request('/SERVICE_A/POST_DATA', params, true);

export const serviceAGetData = (params) => request('/SERVICE_A/GET_DATA', params);