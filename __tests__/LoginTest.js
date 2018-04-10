const detox = require('detox');
const config = require('../package.json').detox;



beforeAll(async () => {
    await detox.init(config);
});

it('works', () => {
    expect(1).toBe(1);
});

afterAll(async () => {
    await detox.cleanup();
});