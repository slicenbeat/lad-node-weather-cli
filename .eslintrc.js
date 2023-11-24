module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: 'standard-with-typescript',
  overrides: [
  ],
  rules: {
    '@typescript-eslint/strict-boolean-expressions': 'off',
    'accessor-pairs': 'off'
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: 'tsconfig.json'
  }
}
