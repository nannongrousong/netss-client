/**
 * 发起网络请求
 * @param {请求地址} url 
 * @param {请求参数} params
 * @param {请求类型，默认GET} method
 */
export default async (url, params, method = 'GET') => {
    url = '/api' + url;
    let response = null;
    let commonOptions = {
        method,
        headers: {
            'authorization': `Bearer ${sessionStorage.getItem('AUTH_INFO')}`
        }
    };
    if (['POST', 'PUT'].includes(method)) {
        response = await fetch(url, {
            ...commonOptions,
            body: JSON.stringify(params),
            headers: {
                ...commonOptions.headers, 
                'Content-type': 'application/json; charset=UTF-8'
            }
        });
    } else if (method == 'DELETE') {
        response = await fetch(`${url}/${params}`, commonOptions);
    } else {
        params = new URLSearchParams(params);
        response = await fetch(url + '?' + params.toString(), commonOptions);
    }

    if (response.ok) {
        let data = await response.json();
        if (data.code) {
            return data;
        } else {
            throw new Error(data.info);
        }
    } else {
        throw new Error(`fetch error. url: ${url}, \n params: ${JSON.stringify(params)}, \n info:${response.statusText}`);
    }
};