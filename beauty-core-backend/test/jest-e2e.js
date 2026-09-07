module.exports = {
  setupFilesAfterEnv: ['<rootDir>/test/jest-e2e.setup.ts'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '..',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/test/e2e/**/*.e2e-spec.ts'],
  setupFiles: ['<rootDir>/test/env-test.guard.ts'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  testTimeout: 60000,
  maxWorkers: 1,
  detectOpenHandles: true,
  forceExit: true,
};
