module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  extends: [
    'plugin:vue/essential'
  ],
  plugins: [
    'import'
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: [".js", ".vue"]
      }
    }
  },
  rules: {
    'no-duplicate-imports': 'error',
    // keep minimal set passing
    'vue/require-v-for-key': 0,
    'no-dupe-keys': 'error',

    // don't allow code after a return statement
    'no-unreachable': 'error',

    // don't allow references to variables or functions that don't exist
    'no-undef': 'error',
    'no-empty-function': 'error',
    'import/no-unresolved': [ 'error', { commonjs: true } ]
  },
  globals: {
    go: true,
    setTitle: true,
    google: true,
    Toast: true
  },
  env: {
    node: true, // allow module, process
    jest: true, // allow describe, it, ...
    browser: true // allow window, document, ...
  }
}
