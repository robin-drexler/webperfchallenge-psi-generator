const crawlTopSites = require('../crawl-top-sites');

// integration test that makes sure
// parsing from wikipedia still works
// and e.g. structure of page has not changed
describe("crawl top sites smoke test", () => {
    it("crawls top sites from wikipedia", (done) => {
        crawlTopSites().then((urls) => {
            // multiple assertions as multiple requests would take too long
            expect(urls.length).toBeGreaterThan(50);
            expect(urls).toContain('http://google.com');
            done();
        });
    });
});