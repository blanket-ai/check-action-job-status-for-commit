module.exports = {
  extends: 'eslint:recommended',
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'no-console': 1,
    'no-unused-vars': 1,
    'no-useless-escape': 1,
    'no-extra-semi': 1,
    'no-undef': 2,
    'comma-dangle': [ 2, 'always-multiline' ],
  }
}
