export default async (url, params, isPost = false) => {
    url = '/api' + url;
    params = new URLSearchParams(params);

    let response = null;
    if (isPost) {
        response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'authorization': `Bearer ${sessionStorage.getItem('AUTH_INFO')}`
            },
            body: params.toString()
        });
    } else {
        response = await fetch(url + '?' + params.toString(), {
            headers: {
                'authorization': `Bearer ${sessionStorage.getItem('AUTH_INFO')}`
            }
        });
    }

    if (response.ok) {
        let data = await response.json();
        if (data.code == 0) {
            return data;
        } else {
            throw new Error(data.info);
        }
    } else {
        throw new Error(`fetch error. url: ${url}, \n params: ${JSON.stringify(params)}, \n info:${response.statusText}`);
    }
};