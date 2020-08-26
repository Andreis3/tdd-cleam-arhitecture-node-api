// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('./jest.config');

config.testMatch = ['**/tests/integration/**/*.spec.ts'];
config.collectCoverage = false;
// config.testRegex = ['test\\.js$'];
console.log('RUNNING UNIT TEST');

module.exports = config;
