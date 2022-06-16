module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended', // Make sure this is always the last element in the array.
  ],
  plugins: ['simple-import-sort', 'prettier'],
  rules: {
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    'react/react-in-jsx-scope': 'off',
    'jsx-a11y/accessible-emoji': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    'react/display-name': 0,
    'no-unused-vars': 0,
    'react/no-unused-state': 1,

    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/triple-slash-reference': 0,

    'prefer-const': 0,
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-empty-function': 0,

    'import/no-unresolved': 'off',
    'import/no-mutable-exports': 'off',
    'import/prefer-default-export': 'off',
    'import/no-dynamic-require': 'off',
    'global-require': 'off',
    'import/no-extraneous-dependencies': 'off',

    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'react-hooks/exhaustive-deps': 'off',

    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/media-has-caption': 'off',

    'no-useless-catch': 'off',
    'no-continue': 'off',
    'no-nested-ternary': 'off',
    'no-unused-expressions': 'off',
    'consistent-return': 'off',
    'react/no-danger': 'off',
    'no-console': 'off',
    'no-underscore-dangle': 'off',
    'no-restricted-syntax': [
      'error',
      {
        selector:
          "CallExpression[callee.object.name='console'][callee.property.name!=/^(log|warn|error|info|trace|debug)$/]",
        message: 'Unexpected property on console object was called',
      },
    ],
    '@typescript-eslint/no-namespace': 'off',
  },
};
