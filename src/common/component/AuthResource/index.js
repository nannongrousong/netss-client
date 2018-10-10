let resource = new Set();

export const setResource = (list) => {
    resource = new Set(list);
};

export const authResource = (resID) => (res) => (resource.has(resID) && res);