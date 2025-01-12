import type { Config } from 'jest';

const config: Config = {
  displayName: 'web',
  preset: '../../jest-preset.js',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/web',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  moduleNameMapper: {
    '@fruit-basket/ui': '<rootDir>/../../libs/shared/ui/src/index.ts',
    '@fruit-basket/utils': '<rootDir>/../../libs/shared/utils/src/index.ts',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};

export default config;
