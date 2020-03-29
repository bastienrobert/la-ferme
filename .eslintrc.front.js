// https://eslint.org/docs/developer-guide/shareable-configs

const merge = require('lodash.merge')
const node = require('./.eslintrc.back.js')

module.exports = merge(node, {
  extends: ['plugin:react/recommended', '@react-native-community'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true // Allows for the parsing of JSX
    }
  },
  plugins: ['react', 'react-hooks'],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {}
})
