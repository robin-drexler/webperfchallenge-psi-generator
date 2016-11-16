const psi = require('psi');
const mapLimit = require('async').mapLimit;
const PSI_KEY = 'AIzaSyDlY9PPD7DUyhxeyI6iiSgmoKBiNM5FURc';

const handlePsiSuccess = (callback, url, data) => {
    callback(null, {
        url,
        score: data.ruleGroups.SPEED.score
    })
};

module.exports = (urls) => {
    return new Promise((resolve, reject) => {
        const MAX_PARALLEL_REQUESTS = 4;

        mapLimit(urls,
            MAX_PARALLEL_REQUESTS,
            (url, callback) => {
                console.error('PSI:', url, 1);
                psi(url).then((data) => {
                    handlePsiSuccess(callback, url, data);
                }).catch(() => {
                    console.error('PSI:', url, 2);

                    psi(url).then((data) => {
                        handlePsiSuccess(callback, url, data);
                    }).catch((err) => {
                        callback(err);
                    })
                });
            },
            (err, urls) => {
                if (err) {
                    return reject(err);
                }
                resolve(urls);
            }
        )
    });
};