import request from 'COMMON_UTILS/request';

export const Upload_Attach = (params) => request('/Attach', params, 'FILE');