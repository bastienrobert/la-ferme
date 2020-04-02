const merge = require('lodash.merge')
const shared = require('../../.eslintrc.back.js')

module.exports = merge(shared, {
  rules: {
    '@typescript-eslint/camelcase': 'off'
  }
})
