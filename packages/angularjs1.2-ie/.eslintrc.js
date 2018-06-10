module.exports = {
  parserOptions: {
    ecmaVersion: 5,
    sourceType: 'scripts'
  },
  env: {
    browser: true,
    commonjs: true
  },
  rules: {
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'comma-dangle': ['error', 'never'],
    'no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
    'keyword-spacing': ['error', { 'before': true, after: true}],
    'space-before-function-paren': ['error', 'always'],
    'eqeqeq': ['error', 'always', {'null': 'ignore'}],
    'comma-spacing': ['error', { 'before': false, 'after': true }],
    'no-multiple-empty-lines': ['error', {'max': 2, 'maxEOF': 1 }],
    'operator-linebreak': ['error'],
    'brace-style': ['error'],
    'curly': ['error'],
    'one-var': ['error', 'never'],
    'no-cond-assign': ['error'],
    'block-spacing': ['error'],
    'no-whitespace-before-property': ['error'],
    'comma-style': ['error', 'last'],
    'dot-location': ['error', 'property'],
    'eol-last': ['error', 'always'],
    'func-call-spacing': ['error', 'never'],
    'key-spacing': ['error'],
    'new-cap': ['error', { 'newIsCap': true }],
    'new-parens': ['error'],
    'no-array-constructor': ['error'],
    'no-caller': ['error'],
    'no-constant-condition': ['error'],
    'no-control-regex': ['error'],
    'no-delete-var': ['error'],
    'no-dupe-args': ['error'],
    'no-dupe-keys': ['error'],
    'no-duplicate-case': ['error'],
    'no-empty-character-class': ['error'],
    'no-eval': ['error'],
    'no-ex-assign': ['error'],
    'no-extend-native': ['error'],
    'no-extra-bind': ['error'],
    'no-extra-boolean-cast': ['error'],
    'no-fallthrough': ['error'],
    'no-func-assign': ['error'],
    'no-global-assign': ['error'],
    'no-implied-eval': ['error'],
    'no-invalid-regexp': ['error'],
    'no-label-var': ['error'],
    'no-labels': ['error'],
    'no-lone-blocks': ['error'],
    'no-tabs': ['error'],
    'no-multi-spaces': ['error'],
    'no-multi-str': ['error'],
    'no-new': ['error'],
    'no-new-func': ['error'],
    'no-new-object': ['error'],
    'no-new-require': ['error'],
    'no-new-wrappers': ['error'],
    'no-obj-calls': ['error'],
    'no-octal': ['error'],
    'no-proto': ['error'],
    'no-redeclare': ['error'],
    'no-return-assign': ['error', 'except-parens'],
    'no-regex-spaces': ['error'],
    'no-self-assign': ['error'],
    'no-self-compare': ['error'],
    'no-sequences': ['error'],
    'no-sparse-arrays': ['error'],
    'no-throw-literal': ['error'],
    'no-trailing-spaces': ['error'],
    'no-unmodified-loop-condition': ['error'],
    'no-unreachable': ['error'],
    'no-whitespace-before-property': ['error'],
    'no-with': ['error'],
    'object-property-newline': ['error'],
    'padded-blocks': ['error', 'never'],
    'semi-spacing': ['error'],
    'space-in-parens': ['error', 'never'],
    'space-unary-ops': ['error'],
    'use-isnan': ['error'],
    'yoda': ['error']
  }
}