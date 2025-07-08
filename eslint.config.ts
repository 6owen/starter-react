import { arvinn } from '@arvinn/eslint-config'

export default arvinn({
  vue: true,
  pnpm: true,
  unocss: false,
}).append(
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    rules: {
      'perfectionist/sort-objects': 'error',
      'import-x/no-default-export': 'error',
    },
  },
  {
    files: ['**/*.md/*'],
    rules: {
      'perfectionist/sort-named-imports': 'off',
    },
  },
  {
    rules: {
      // 关闭这条规则
      'node/prefer-global/process': 'off',
    },
  },
)
