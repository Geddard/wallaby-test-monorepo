const baseConfig = require('../../../jest.config.base')(__dirname)

module.exports = {
  ...baseConfig,
  testEnvironment: 'jest-environment-jsdom',
  resetMocks: true,
  testMatch: ['<rootDir>/**/*.test.[jt]s?(x)'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  verbose: true,
  collectCoverageFrom: [
    'src/components/**/*.{ts,tsx}',
    'src/layout/**/*.{ts,tsx}',
    'src/util/**/*.{ts,tsx}',
    'src/icons/**/*.{ts,tsx}',
    '!src/components/index.ts',
    '!src/layout/SideBar/index.ts',
    '!src/layout/index.ts',
    '!src/util/index.ts',
    '!src/icons/index.ts',
  ],
}
