const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig')

const typescriptModuleNameMapper = pathsToModuleNameMapper(
  compilerOptions.paths,
  {
    prefix: '<rootDir>/'
  }
)

module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: Object.assign(
    {
      '.+\\.(png|jpg|ttf|woff|woff2)$': 'identity-obj-proxy',
      'styled-components/native':
        '<rootDir>/node_modules/styled-components/native',
      'styled-components': '<rootDir>/node_modules/styled-components'
    },
    typescriptModuleNameMapper
  ),
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts']
}
