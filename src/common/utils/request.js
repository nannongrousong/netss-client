export default async (url, params, isPost = false) => {
    url = '/api' + url;
    params = new URLSearchParams(params);

    let response = null;
    if (isPost) {
        response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: params.toString()
        });
    } else {
        response = await fetch(url + '?' + params.toString());
    }

    if (response.ok) {
        let data = await response.json();
        return data;
    } else {
        throw new Error(`fetch error, url: ${url}, params: ${JSON.stringify(params)}`);
    }
};