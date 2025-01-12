import type { Config } from 'jest';

const config: Config = {
  displayName: 'utils',
  preset: '../../../jest-preset.js',
  coverageDirectory: '../../../coverage/libs/shared/utils',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
};

export default config;
