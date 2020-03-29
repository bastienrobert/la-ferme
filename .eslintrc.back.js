// https://eslint.org/docs/developer-guide/shareable-configs

module.exports = {
  root: true,
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jest'],
  rules: {
    semi: 'off',
    'comma-dangle': 'off',
    curly: ['warn', 'multi-line'],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off'
  }
}
