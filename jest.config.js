export const testEnvironment = 'node';
export const collectCoverage = true;
export const coverageDirectory = 'coverage';
export const testMatch = ['**/__tests__/**/*.test.js', '**/*.test.js'];
export const clearMocks = true;
export const setupFilesAfterEnv = ['./jest.setup.js'];
export const transform = {
  '^.+\\.js$': 'babel-jest',
};