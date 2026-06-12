import { arvinn } from '@arvinn/eslint-config'

export default arvinn({
  tailwindcss: false,
  vue: true,
  pnpm: true,
  unocss: false,
}).append(
  {
    ignores: ['src/routeTree.gen.ts'],
  },
  {
    files: ['src/**/*.ts'],
    rules: {
      'perfectionist/sort-objects': 'error',
    },
  },
  {
    files: ['**/*.md/*'],
    rules: {
      'perfectionist/sort-named-imports': 'off',
    },
  },
)
