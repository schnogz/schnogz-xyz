module.exports = {
  extends: [
    'plugin:import/recommended',
    'plugin:ghost/node',
    'plugin:ghost/ember',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    ecmaVersion: 6,
  },
  plugins: ['ghost', 'simple-import-sort', 'sort-destructure-keys', 'sort-keys-fix', 'import'],
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
    'ghost/ember/use-ember-get-and-set': 'off',
    'ghost/sort-imports-es6-autofix/sort-imports-es6': 'off',
    'ghost/ember/require-fetch-import': 'off',
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
          [
            "^(components|config|content|fonts|img|pages|styles|utils)(/.*|$)"
          ],
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
    propWrapperFunctions: ['forbidExtraProps'],
    'import/resolver': {
      alias: [
        ['components', './src/components'],
        ['fonts', './src/fonts'],
        ['img', './src/img'],
        ['pages', './src/pages'],
        ['styles', './src/styles'],
        ['utils', './src/utils'],
      ],
    },
    react: {
      version: 'detect',
    },
  },
}
