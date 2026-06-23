module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '..',
  testEnvironment: 'node',

  testMatch: [
    '<rootDir>/test/unit/**/*.spec.ts',
    '<rootDir>/test/e2e/**/*.e2e-spec.ts',
  ],

  setupFiles: ['<rootDir>/test/env-test.guard.ts'],

  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },

  testTimeout: 60000,
  maxWorkers: 1,
  detectOpenHandles: true,
  forceExit: true,

  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main.ts',
    '!<rootDir>/src/**/*.module.ts',
    '!<rootDir>/src/**/*.dto.ts',
    '!<rootDir>/src/**/*.entity.ts',
    '!<rootDir>/src/**/*.interface.ts',
    '!<rootDir>/src/**/*.type.ts',
    '!<rootDir>/src/**/*.enum.ts',
    '!<rootDir>/src/**/*.spec.ts',
    '!<rootDir>/src/**/*.e2e-spec.ts',
    '!<rootDir>/src/**/constants/**/*.ts',
    '!<rootDir>/src/**/index.ts',
  ],

  coverageDirectory: '<rootDir>/coverage/all',
  coverageReporters: ['text', 'lcov', 'html'],
};
