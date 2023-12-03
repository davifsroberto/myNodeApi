import type { Config } from 'jest';

const config: Config = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: 'coverage',
  collectCoverage: true,
  clearMocks: true,
  coverageProvider: 'v8',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
};

export default config;
