const isError = function(error) {
    return error.response && error.response.status;
};

export const is401 = function(error) {
    return isError && 401 === error.response.status;
}

export const is404 = function(error) {
    return isError && 404 === error.response.status;
};

export const is422 = function(error) {
    return isError && 422 === error.response.status;
};
