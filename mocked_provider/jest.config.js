const jestPreset = require('@testing-library/react-native/jest-preset');

module.exports = {
  preset: 'react-native',
  setupFiles: [...jestPreset.setupFiles],
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
