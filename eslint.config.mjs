import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import importX from 'eslint-plugin-import-x'
import tseslint from 'typescript-eslint'


const COLOR_MESSAGE =
  'Hardcoded colour. Import a token from @/constants/tokens or use a Tailwind token class.'

export default defineConfig([
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),

  ...nextVitals,
  ...nextTs,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['*.mjs', '*.js'],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'import-x': importX,
    },
    settings: {
      'import-x/resolver': { typescript: true, node: true },
    },
    rules: {
      'no-console': 'error',
      'no-alert': 'error',
      'no-debugger': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'object-shorthand': 'error',
      'no-else-return': 'error',
      'no-nested-ternary': 'error',
      'no-param-reassign': ['error', { props: true }],
      'prefer-template': 'error',
      eqeqeq: ['error', 'always'],
      curly: ['error', 'multi-line'],

      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        { allowNumber: true },
      ],

      'import-x/no-duplicates': 'error',
      'import-x/no-cycle': 'error',
      'import-x/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          pathGroups: [{ pattern: '@/**', group: 'internal', position: 'after' }],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],

      'no-restricted-syntax': [
        'error',
        {
          selector:
            'Literal[value=/#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\\b/]',
          message: COLOR_MESSAGE,
        },
        {
          selector:
            'TemplateElement[value.raw=/#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\\b/]',
          message: COLOR_MESSAGE,
        },
        {
          selector: 'Literal[value=/\\b(?:rgba?|hsla?|oklch|oklab)\\s*\\(/]',
          message: COLOR_MESSAGE,
        },
        {
          selector: 'TemplateElement[value.raw=/\\b(?:rgba?|hsla?|oklch|oklab)\\s*\\(/]',
          message: COLOR_MESSAGE,
        },
      ],

      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../*'],
              message: 'Use the @/ alias instead of relative parent imports.',
            },
          ],
        },
      ],
    },
  },

  {
    files: ['src/constants/tokens.ts'],
    rules: { 'no-restricted-syntax': 'off' },
  },

  {
    files: ['src/components/ui/**'],
    rules: {
      'import-x/order': 'off',
      '@typescript-eslint/no-unnecessary-condition': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
    },
  },

  {
    files: ['src/lib/render/**'],
    rules: {
      '@next/next/no-img-element': 'off',
      'jsx-a11y/alt-text': 'off',
    },
  },

  {
    files: ['src/components/shot-form.tsx'],
    rules: { '@next/next/no-img-element': 'off' },
  },
])
