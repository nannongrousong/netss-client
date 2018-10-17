import 'isomorphic-fetch';
import 'url-search-params-polyfill';

/**
 * 发起网络请求
 * @param {请求地址} url 
 * @param {请求参数} params
 * @param {请求类型，默认GET} method，可选POST/PUT/DELETE/FILE/GET
 */
export default async (url, params, method = 'GET') => {
    url = '/api' + url;

    console.log('%c请求地址：', 'color:red;', url);
    console.log('%c请求参数：', 'color:red;', params);

    let response = null;
    let commonOptions = {
        method,
        headers: {
            'authorization': `Bearer ${sessionStorage.getItem('AUTH_INFO')}`
        }
    };

    switch (method) {
        case 'POST':
        case 'PUT':
            response = await fetch(url, {
                ...commonOptions,
                body: JSON.stringify(params),
                headers: {
                    ...commonOptions.headers,
                    'Content-type': 'application/json; charset=UTF-8'
                }
            });
            break;
        case 'DELETE':
            response = await fetch(`${url}/${params}`, commonOptions);
            break;
        case 'FILE':
            response = await fetch(url, {
                ...commonOptions,
                body: params,
                method: 'POST'
            });
            break;
        default:
            params = new URLSearchParams(params);
            response = await fetch(url + '?' + params.toString() + `&_${new Date().getTime()}`, commonOptions);
            break;
    }

    if (response.ok) {
        let resData = await response.json();
        if (resData.Code) {
            return resData;
        } else {
            throw new Error(resData.Info || '');
        }
    } else {
        if (response.status == 401) {
            let resData = await response.json();
            throw new Error(resData.Info);
        }
        throw new Error(`fetch error. url: ${url}, \n params: ${JSON.stringify(params)}, \n info:${response.statusText}`);
    }
};