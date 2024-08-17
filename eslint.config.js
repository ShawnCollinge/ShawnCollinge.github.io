import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import react from 'eslint-plugin-react';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.{ts,tsx}'],
    ignores: ['dist', 'vite.config.ts'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      react,
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...tseslint.configs['recommended'].rules,
      ...tseslint.configs['recommended-requiring-type-checking'].rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react-hooks/rules-of-hooks': 'warn',
      'react-hooks/exhaustive-deps': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      'react/jsx-indent': ['warn', 2],
      'react/jsx-wrap-multilines': [
        'warn',
        {
          declaration: 'parens-new-line',
          assignment: 'parens-new-line',
          return: 'parens-new-line',
          arrow: 'parens-new-line',
          condition: 'parens-new-line',
        },
      ],
      'indent': ['warn', 2, { SwitchCase: 1 }],
      'space-infix-ops': ['warn', { int32Hint: false }],
      'space-before-function-paren': [
        'warn',
        {
          anonymous: 'always',
          named: 'never',
          asyncArrow: 'always',
        },
      ],
      '@typescript-eslint/no-misused-promises': 'warn', 
      '@typescript-eslint/no-unsafe-assignment': 'warn', 
      '@typescript-eslint/no-unsafe-argument': 'warn', 
      '@typescript-eslint/no-floating-promises': 'warn', 
      '@typescript-eslint/only-throw-error': 'warn',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
