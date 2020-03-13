const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('ts-loader')
      },
      {
        loader: require.resolve('react-docgen-typescript-loader'),
        options: {
          tsconfigPath: path.resolve(__dirname, '../tsconfig.json'),
          shouldExtractLiteralValuesFromEnum: true
        }
      }
    ]
  })
  config.resolve.plugins = config.resolve.plugins || []
  config.resolve.plugins.push(new TsconfigPathsPlugin())
  config.resolve.extensions.push('.ts', '.tsx')
  return config
}
