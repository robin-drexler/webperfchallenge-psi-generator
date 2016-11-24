const retryPromise = require('../../lib/retry-promise');

describe('retryPromise', () => {

    it('should retry failed promises then fail', (done) => {
        let rejectingPromiseSpy = jasmine.createSpy('promise').andCallFake(() => {
            return Promise.reject();
        });

        retryPromise(rejectingPromiseSpy, 3)
            .catch(() => {
                expect(rejectingPromiseSpy.calls.length).toEqual(4);
                done();
            });
    });

    it('should not retry when retry is omitted', (done) => {
        let rejectingPromiseSpy = jasmine.createSpy('promise').andCallFake(() => {
            return Promise.reject();
        });

        retryPromise(rejectingPromiseSpy)
            .catch(() => {
                expect(rejectingPromiseSpy.calls.length).toEqual(1);
                done();
            });
    });

    it('should retry failed promises then resolve on success', (done) => {
        let callCount = 0;
        const promiseResult = true;

        let rejectingThenSucceedingPromiseSpy = jasmine.createSpy('promise').andCallFake(() => {
            if (callCount == 1) {
                return Promise.resolve(promiseResult)
            } else {
                callCount += 1;
                return Promise.reject();
            }
        });

        retryPromise(rejectingThenSucceedingPromiseSpy, 5)
            .then((result) => {
                expect(result).toEqual(promiseResult);
                expect(rejectingThenSucceedingPromiseSpy.calls.length).toEqual(2);
                done();
            });
    });
});