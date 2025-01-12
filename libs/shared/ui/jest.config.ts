/* eslint-disable */
export default {
  displayName: 'ui',
  preset: '../../../jest-preset.js',
  coverageDirectory: '../../../coverage/libs/shared/ui',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  moduleNameMapper: {
    '@fruit-basket/utils': '<rootDir>/../utils/src/index.ts'
  }
};
