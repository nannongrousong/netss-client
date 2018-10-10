import request from 'COMMON_UTILS/request';

export const File_Upload = (params) => request('/Attach', params, 'FILE');