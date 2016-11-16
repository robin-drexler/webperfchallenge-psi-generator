const runPageSpeed = require('../run-page-speed');

describe("run page speed smoke test", () => {

    // integration test
    it('retrieves pagespeed data from psi api for provided domains', (done) => {
        runPageSpeed(['http://xing.de', 'http://google.com']).then((urls) => {
            expect(urls.length).toEqual(2);
            const xingResult = urls[0];

            expect(xingResult.score).toEqual(jasmine.any(Number));
            expect(xingResult.url).toEqual('http://xing.de');
            done();
        });
    });
});