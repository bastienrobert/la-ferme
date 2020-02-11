module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        extensions: ['.js', '.jsx', '.es', '.es6', '.mjs', '.tx', '.tsx'],
        alias: {
          '@': './src'
        }
      }
    ]
  ]
}
