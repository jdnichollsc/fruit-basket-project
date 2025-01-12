import type { Config } from 'jest';

const config: Config = {
  displayName: 'ui',
  preset: '../../../jest-preset.js',
  coverageDirectory: '../../../coverage/libs/shared/ui',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  moduleNameMapper: {
    '@fruit-basket/utils': '<rootDir>/../utils/src/index.ts',
  },
};

export default config;
