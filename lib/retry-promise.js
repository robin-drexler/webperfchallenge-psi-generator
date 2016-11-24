const ERR_TOO_MANY_RETRIES = 'ERR_TOO_MANY_RETRIES';

function retry(func, tries, resolve, reject, lastError) {
    if (tries > 0) {
        func()
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                retry(func, --tries, resolve, reject, err);
            });
    } else {
        reject(lastError);
    }
}

module.exports = function retryPromise(func, retries = 0) {
    const tries = retries + 1;
    return new Promise((resolve, reject) => {
        retry(func, tries, resolve, reject);
    });
};