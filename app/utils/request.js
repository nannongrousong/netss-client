export default (url, params, isPost = false) => {
    params = new URLSearchParams(params);
    if(isPost) {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8' 
            },
            body: params.toString()
        });
    } else {
        return fetch(url + '?' + params.toString());
    }
};