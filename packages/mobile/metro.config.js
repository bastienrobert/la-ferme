/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require('path')

const currentDir = __dirname

const extras = [
  'react',
  'react-native',
  'styled-components',
  '@babel/runtime',
  '@react-navigation/native',
  'react-native-safe-area-context'
]

module.exports = {
  watchFolders: [path.resolve(currentDir, '..')],
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false
      }
    })
  },
  resolver: {
    extraNodeModules: extras.reduce((acc, extra) => {
      acc[extra] = path.resolve(currentDir, 'node_modules/' + extra)
      return acc
    }, {})
  }
}
