// import { startupMessage } from '../src/server/server'
const startupMessage = require('../src/server/server');
test('listen', () => {
    expect(startupMessage).toBeDefined();
});