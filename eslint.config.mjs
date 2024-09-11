import pluginJs from '@eslint/js';
import eslintPluginMarkdownlint from 'eslint-plugin-markdownlint';
import markdownParser from 'eslint-plugin-markdownlint/parser.js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';

export default [
  {
    files: ['*.{js,mjs,md}', 'src/**/*.{js,md}'],
    languageOptions: { globals: globals.browser },
  },
  pluginJs.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    rules: {
      'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    },
  },
  {
    files: ['*.{js,mjs}', 'src/**/*.{js,mjs}'],
    rules: {
      'sort-keys': [
        'error',
        'asc',
        { caseSensitive: false, minKeys: 2, natural: true },
      ],
    },
  },
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',
    },
  },
  {
    files: ['*.md', 'src/**/*.md'],
    rules: {
      'prettier/prettier': [
        'error',
        {
          parser: 'markdown',
        },
      ],
    },
  },
  {
    files: ['*.md', 'src/**/*.md'],
    languageOptions: { parser: markdownParser },
    plugins: {
      markdownlint: eslintPluginMarkdownlint,
    },
    rules: {
      ...eslintPluginMarkdownlint.configs.recommended.rules,
      'markdownlint/md033': 'off',
    },
  },
  {
    files: ['README.md'],
    rules: {
      'markdownlint/md013': 'off',
    },
  },
];
