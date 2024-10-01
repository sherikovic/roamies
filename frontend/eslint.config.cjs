/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
const reactHooks = require('eslint-plugin-react-hooks')
const reactRecommended = require('eslint-plugin-react/configs/recommended')
const eslint = require('@eslint/js')
const tseslint = require('typescript-eslint')
const eslintConfigPrettier = require('eslint-config-prettier')
const prettier = require('eslint-plugin-prettier')
const unusedImports = require('eslint-plugin-unused-imports')

module.exports = tseslint.config(
  { ...eslint.configs.recommended, ignores: ['public'] },
  ...tseslint.configs.recommended.map((confg) => ({
    ...confg,
    ignores: ['public'],
  })),
  { ...reactRecommended, ignores: ['public'] },
  {
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'unused-imports': unusedImports,
      prettier: prettier,
    },
    rules: {
      // react-hooks doesn't currently woyrk in eslint 9
      // 'react-hooks/rules-of-hooks': 'error',
      // 'react-hooks/exhaustive-deps': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      // I would preffer eslint-plugin-import but it doesn't work in eslint 9 yet
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
      ],
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off', // using typescript
      'prettier/prettier': [
        'error',
        {
          printWidth: 100,
          singleQuote: true,
          trailingComma: 'all',
          semi: false,
        },
      ],
    },
    ignores: ['public'],
  },
  { ...eslintConfigPrettier, ignores: ['public'] },
)
