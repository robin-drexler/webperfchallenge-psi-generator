const psi = require('psi');
const mapLimit = require('async').mapLimit;
const retryPromise = require('./retry-promise');

// todo: use from env. Invalidate this key
const PSI_KEY = 'AIzaSyDlY9PPD7DUyhxeyI6iiSgmoKBiNM5FURc';

const createRetrievePsiFunction = (url) => () => {
    console.error(`Requesting PSI for: ${url}`);
    return psi(url, {key: PSI_KEY});
};

const handlePsiSuccess = (callback, url, data) => {
    callback(null, {
        url,
        score: data.ruleGroups.SPEED.score
    })
};

const handlePsiFailure = (callback) => {
    callback(null, {
        undefined,
        score: 0
    });
};


module.exports = (urls) => {
    return new Promise((resolve, reject) => {
        const MAX_PARALLEL_REQUESTS = 2;

        mapLimit(urls,
            MAX_PARALLEL_REQUESTS, (url, callback) => {
                retryPromise(createRetrievePsiFunction(url), 1).then((data) => {
                    handlePsiSuccess(callback, url, data);
                }).catch((err) => {
                    console.error(`Failed to get PSI for: ${url}`);
                    handlePsiFailure(callback)
                })
            }, (err, urls) => {
                if (err) {
                    return reject(err);
                }
                // remove failed (undefined) urls
                resolve(urls.filter((data) => data.url));
            }
        )
    });
};