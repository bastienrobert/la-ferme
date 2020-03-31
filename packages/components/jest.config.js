const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig')

const directoriesToIgnore = [
  '<rootDir>/node_modules/',
  '<rootDir>/dist/',
  '<rootDir>/native/dist/',
  '<rootDir>/.storybook/'
]

module.exports = {
  preset: 'ts-jest',
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.tsx',
    '!<rootDir>/src/**/*.story.tsx'
  ],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/'
  }),
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  transformIgnorePatterns: directoriesToIgnore,
  testPathIgnorePatterns: directoriesToIgnore
}
