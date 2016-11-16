const request = require('request');
const cheerio = require('cheerio');

const WIKIPEDIA_TOP_SITES_URL = 'https://en.wikipedia.org/wiki/List_of_most_popular_websites';

module.exports = () => {
    return new Promise((resolve, reject) => {
        request(WIKIPEDIA_TOP_SITES_URL, (err, response, body) => {
            if (err) {
                reject(err);
            }
            const $ = cheerio.load(body);

            // table looks like |Site (name) | Domain | ...
            // we care about the domain only
            // .map is *not* Array.map, but cheerio map
            // https://github.com/cheeriojs/cheerio#map-functionindex-element-
            const urls = $('.wikitable td:nth-of-type(2)')
                .map((_, td) => {
                    return 'http://' + $(td).text();
                })
                .get();

            resolve(urls);
        });
    });
};