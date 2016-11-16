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

    it('should have error when psi fails too often', (done) => {
        const psiError = new Error('url not reachable');

        // spy returns always an error
        let psiSpy = jasmine.createSpy('psi').andCallFake(() => {
            return Promise.reject(psiError);
        });

        let runPageSpeed = proxyquire('../../lib/run-page-speed', {
            psi: psiSpy
        });


        runPageSpeed(['someurl']).catch((err) => {
            expect(err).toBe(psiError);
            done();
        });
    });
});