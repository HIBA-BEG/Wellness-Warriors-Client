const shared = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
};

export default {
  projects: [
    {
      ...shared,
      displayName: 'unit',
      testMatch: ['<rootDir>/tests/printEvent.test.js'],
    },
    {
      ...shared,
      displayName: 'ui',
      testMatch: ['<rootDir>/tests/**/*.test.js'],
      testPathIgnorePatterns: ['printEvent.test.js'],
      setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
    },
  ],
};
