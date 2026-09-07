const base = require('./jest-all.coverage');

module.exports = {
  ...base,
  coverageDirectory: '<rootDir>/coverage/all',
  coverageReporters: ['text', 'lcov', 'json', 'json-summary'],
};
