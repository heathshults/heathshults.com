module.exports = {
  'env': {
      'browser': true,
      'commonjs': true,
      'es6': true,
      'node': true
  },
  'extends': [
      'eslint:recommended',
      'plugin:@typescript-eslint/eslint-recommended'
  ],
  'globals': {
      'Atomics': 'readonly',
      'SharedArrayBuffer': 'readonly'
  },
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 6,
    'sourceType': 'module',
    'ecmaFeatures': {
    'modules': true,
    'jsx': true
    }
  },
  'plugins': [
      '@typescript-eslint'
  ],
  'rules': {
    'no-unused-vars': 'warn'
  }
}
