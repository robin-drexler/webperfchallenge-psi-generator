const proxyquire = require('proxyquire');

describe('run page speed', () => {
    const SOME_PSI_RESULT = {ruleGroups: {SPEED: {score: 1}}};

    it('should retry once upon failure', (done) => {
        let callCount = 0;

        // spy returns error at first attempt
        // but succeeds at second attempt
        let psiSpy = jasmine.createSpy('psi').andCallFake(() => {
            if (callCount == 0) {
                callCount += 1;
                return Promise.reject();
            } else {
                return Promise.resolve(SOME_PSI_RESULT);
            }
        });

        let runPageSpeed = proxyquire('../../lib/run-page-speed', {
            psi: psiSpy
        });


        runPageSpeed(['someurl']).then((urls) => {
            expect(psiSpy.calls.length).toEqual(2);
            done();
        });
    });

    it('should omit failed urls', (done) => {
        const FAILING_URL = 'failingUrl';
        const psiError = new Error('url not reachable');
        let callCount = 0;

        let psiSpy = jasmine.createSpy('psi').andCallFake((url) => {

            if (url === FAILING_URL) {
                return Promise.reject();

            } else {
                return Promise.resolve(SOME_PSI_RESULT);
            }
        });

        let runPageSpeed = proxyquire('../../lib/run-page-speed', {
            psi: psiSpy
        });


        runPageSpeed(['someUrl', 'failingUrl']).then((urls) => {
            expect(urls.length).toBe(1);
            expect(urls[0].url).toEqual('someUrl');

            done();
        });
    });
});