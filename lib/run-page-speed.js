const psi = require('psi');
const mapLimit = require('async').mapLimit;

// todo: use from env. Invalidate this key
const PSI_KEY = 'AIzaSyDlY9PPD7DUyhxeyI6iiSgmoKBiNM5FURc';

const handlePsiSuccess = (callback, url, data) => {
    callback(null, {
        url,
        score: data.ruleGroups.SPEED.score
    })
};

module.exports = (urls) => {
    return new Promise((resolve, reject) => {
        const MAX_PARALLEL_REQUESTS = 2;

        mapLimit(urls,
            MAX_PARALLEL_REQUESTS, (url, callback) => {
                console.error(`Requesting PSI for: ${url}`);
                psi(url, { key: PSI_KEY }).then((data) => {
                    handlePsiSuccess(callback, url, data);
                }).catch(() => {
                    console.error(`Requesting PSI for: ${url} for the second time`);
                    psi(url, { key: PSI_KEY }).then((data) => {
                        handlePsiSuccess(callback, url, data);
                    }).catch((err) => {
                        console.error(`Failed to get PSI for: ${url}`);
                        callback(err);
                    })
                });
            }, (err, urls) => {
                if (err) {
                    return reject(err);
                }
                resolve(urls);
            }
        )
    });
};