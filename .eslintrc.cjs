module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
    {
      env: {
        node: true,
        mocha: true,
      },
      files: ['tests/api/**/*.spec.js'],
      rules: {
        'no-unused-expressions': 0,
      },
    },
  ],
  rules: {
    'max-len': [1, { code: 140 }],
    'import/extensions': 0,
  },
};
