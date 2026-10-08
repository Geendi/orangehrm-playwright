import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['node_modules', 'playwright-report', 'test-results', 'playwright/.auth'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: { parserOptions: { project: './tsconfig.json' } },
    rules: {
      // Best practice: catch missing awaits on Playwright calls
      '@typescript-eslint/no-floating-promises': 'error',
    },
  },
);
