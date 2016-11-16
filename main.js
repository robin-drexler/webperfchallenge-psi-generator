const crawlTopSites = require('./lib/crawl-top-sites');
const runPageSpeed = require('./lib/run-page-speed');
const howManySites = process.argv[2] || 3;

crawlTopSites().then((urls) => {
    urls = urls.slice(0, howManySites);
    return runPageSpeed(urls);
}).then((urlsWithScore) => {
    console.log(JSON.stringify((urlsWithScore)));
});