const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig')

const directoriesToIgnore = [
  '<rootDir>/node_modules/',
  '<rootDir>/dist/',
  '<rootDir>/native/dist/',
  '<rootDir>/.storybook/'
]

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.tsx',
    '!<rootDir>/src/**/*.story.tsx'
  ],
  moduleDirectories: ['../../node_modules', 'node_modules', '<rootDir>/src'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/'
  }),
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  transformIgnorePatterns: directoriesToIgnore,
  testPathIgnorePatterns: directoriesToIgnore
}
