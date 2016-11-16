const psi = require('psi');
const mapLimit = require('async').mapLimit;
const PSI_KEY = 'AIzaSyDlY9PPD7DUyhxeyI6iiSgmoKBiNM5FURc';

module.exports = (urls) => {
    return new Promise((resolve, reject) => {
        const MAX_PARALLEL_REQUESTS = 4;

        mapLimit(urls,
            MAX_PARALLEL_REQUESTS,
            (url, callback) => {
                psi(url).then((data) => {
                    callback(null, {
                        url,
                        score: data.ruleGroups.SPEED.score
                    })
                });
                // ToDo: add error handling
                // maybe retry once and fail otherwise
            },
            (err, urls) => {
                if (err) {
                    reject(err);
                }
                resolve(urls);
            }
        )
    });
};