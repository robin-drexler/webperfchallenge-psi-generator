const crawlTopSites = require('./crawl-top-sites');


crawlTopSites().then((urls) => {
    console.log(urls);
});