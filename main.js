const crawlTopSites = require('./lib/crawl-top-sites');
const runPageSpeed = require('./lib/run-page-speed');
const howManySites = process.argv[2] || 3;

// console.error for debug output, so the resulting json is still intact
// since it's written to stdout
console.error('Starting');

crawlTopSites().then((urls) => {
    urls = urls.slice(0, howManySites);
    console.error(`Will check ${urls.length} urls`);

    return runPageSpeed(urls);
}).then((urlsWithScore) => {
    // transform to current firebase structure
    const result = {
        topsites: urlsWithScore.map((site) => {
            return {
                site: site.url,
                mobile: site.score
            }
        })
    };
    console.log(JSON.stringify((result)));
}).catch((err) => {
    console.error('Could not generate urls:', err);
    process.exit();
});