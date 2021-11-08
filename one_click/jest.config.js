const { defaults } = require('jest-config');

module.exports = {
  testEnvironment: 'jsdom',
  roots: [
    '<rootDir>/client/',
    '<rootDir>/__tests__',
  ],
  automock: false,
  resetMocks: false,
  setupFilesAfterEnv: ['./setupJest.js'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  moduleNameMapper: {
    '\\.(css|less|scss)$': '<rootDir>/__mocks__/jest/styleMock.js',
  },
  modulePathIgnorePatterns: ['<rootDir>/__tests__/utils/'],
  transformIgnorePatterns: ['/node_modules/'],
};
