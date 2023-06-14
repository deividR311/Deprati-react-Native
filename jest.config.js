module.exports = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/jest/setup.js'],
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    './__mocks__/mockreact-native-google-signin.ts',
    './__mocks__/mock-apis.js',
    './__mocks__/mockFunctions.ts'
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-navigation)'
  ],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)'
  ],
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'cobertura']
};
