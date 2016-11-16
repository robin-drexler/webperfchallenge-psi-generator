// this tests the entire application with a smoke tests
// using only a small amount of websites to save time
// it ensures that all parts are working correctly together
describe('smoke test for entire application', () => {
    it('generates psi score for top websites', (done) => {
        var execSync = require('child_process').execSync;
        const output = execSync('node main.js 2').toString();
        const result = JSON.parse(output);
        expect(result.length).toEqual(2);

        expect(result[0].url).toContain('http');
        expect(result[0].score).toEqual(jasmine.any(Number));
        done();
    });
});