const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  transformIgnorePatterns: ['/node_modules/(?!(axios)/)'],
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*', '!<rootDir>/src/shared/**/*', '!<rootDir>/src/**/__snapshots__/**/*'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^~/(.*)$': '<rootDir>/public/$1',
    '\\.svg': '<rootDir>/src/shared/mock/svg.js',
  },
};

module.exports = createJestConfig(customJestConfig);
