module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ['plugin:react/recommended', 'standard', 'prettier'],
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  rules: {
    'no-console': 'off',
    // quotes: 'off',
    semi: ['error', 'always'],
    '@typescript-eslint/explicit-function-return-type': ['error'],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    // 'react/jsx-filename-extension': [
    //   1,
    //   { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    // ],
    // 'import/extensions': [
    //   'error',
    //   'ignorePackages',
    //   {
    //     ts: 'never',
    //     tsx: 'never',
    //   },
    // ],
  },
  settings: {
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        typescript: {},
      },
    },
  },
};
