module.exports = {
  rootDir: '.',
  moduleFileExtensions: ['js', 'json', 'ts'],
  testEnvironment: 'node',

  testMatch: ['<rootDir>/test/unit/**/*.spec.ts'],

  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },

  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/main.ts',
    '!src/**/*.module.ts',
    '!src/**/*.dto.ts',
    '!src/**/*.entity.ts',
    '!src/**/*.interface.ts',
    '!src/**/*.type.ts',
    '!src/**/*.spec.ts',
    '!src/**/*.e2e-spec.ts',
    '!src/**/constants/**/*.ts',
    '!src/**/index.ts',
  ],

  coverageDirectory: './coverage',
  coverageReporters: ['text', 'lcov', 'html'],

  clearMocks: true,
  restoreMocks: true,
  passWithNoTests: false,
};
