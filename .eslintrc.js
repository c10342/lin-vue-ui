module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  // 识别webpack别名
  settings: {
    'import/resolver': {
      webpack: {
        config: './build/webpack.base.js'
      }
    }
  },
  extends: [
    'plugin:vue/essential',
    'standard',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    // ecmaFeatures: {
    //   jsx: true, // 启动JSX
    // },
    // parser: 'babel-eslint',
    // ecmaFeatures: {
    //   legacyDecorators: true
    // }
    parser: '@typescript-eslint/parser'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    // 'import/extensions': ['error', 'always'],
    'prefer-destructuring': 'off',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'consistent-return': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-underscore-dangle': 'off',
    'import/no-named-as-default-member': 'off',
    semi: ['error', 'always'],
    'node/no-callback-literal': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-this-alias': 'off'
  }
};
