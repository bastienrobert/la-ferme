/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require('path')

const currentDir = __dirname

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
    extraNodeModules: new Proxy(
      {},
      {
        get: (target, name) => {
          return path.join(__dirname, `node_modules/${name}`)
        }
      }
    )
  }
}
