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
      'styled-components': '<rootDir>/node_modules/styled-components',
      'react-native-svg': '<rootDir>/node_modules/react-native-svg'
    },
    typescriptModuleNameMapper
  ),
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts']
}
