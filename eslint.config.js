const globals = require('globals')
const importPlugin = require('eslint-plugin-import')
const prettierRecommended = require('eslint-plugin-prettier/recommended')
const reactPlugin = require('eslint-plugin-react')
const simpleImportSort = require('eslint-plugin-simple-import-sort')
const sortDestructureKeys = require('eslint-plugin-sort-destructure-keys')
const sortKeysFix = require('eslint-plugin-sort-keys-fix')

module.exports = [
  importPlugin.flatConfigs.recommended,
  reactPlugin.configs.flat.recommended,
  prettierRecommended,
  {
    files: ['src/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      sourceType: 'module',
    },
    plugins: {
      'simple-import-sort': simpleImportSort,
      'sort-destructure-keys': sortDestructureKeys,
      'sort-keys-fix': sortKeysFix,
    },
    rules: {
      'arrow-body-style': ['error', 'as-needed', { requireReturnForObjectLiteral: true }],
      'comma-dangle': [
        'error',
        {
          arrays: 'always-multiline',
          exports: 'always-multiline',
          functions: 'ignore',
          imports: 'always-multiline',
          objects: 'always-multiline',
        },
      ],
      'consistent-return': ['error'],
      'import/export': 'off',
      'import/extensions': 'off',
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-cycle': 'off',
      'import/no-duplicates': 'error',
      'import/no-extraneous-dependencies': 'error',
      'import/no-unresolved': 'error',
      'import/prefer-default-export': 'off',
      'no-console': 'off',
      'no-inner-declarations': 'off',
      'object-curly-spacing': ['error', 'always'],
      'prettier/prettier': 'error',
      'react/prop-types': 'off',
      'require-jsdoc': 'off',
      semi: ['error', 'never'],
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react', '^@?\\w'],
            ['^(components|config|content|fonts|img|pages|styles|utils)(/.*|$)'],
            ['^\\.', '^[^.]'],
          ],
        },
      ],
      'sort-destructure-keys/sort-destructure-keys': 2,
      'sort-keys': ['error', 'asc', { caseSensitive: true, minKeys: 2, natural: false }],
      'sort-keys-fix/sort-keys-fix': 'warn',
      'valid-jsdoc': 'off',
    },
    settings: {
      'import/resolver': {
        alias: {
          map: [
            ['components', './src/components'],
            ['fonts', './src/fonts'],
            ['img', './src/img'],
            ['pages', './src/pages'],
            ['styles', './src/styles'],
            ['utils', './src/utils'],
          ],
        },
      },
      propWrapperFunctions: ['forbidExtraProps'],
      react: {
        version: 'detect',
      },
    },
  },
]
