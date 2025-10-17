// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    type: 'lib',
    pnpm: true,
    rules: {
      'no-console': 'warn',
    },
    ignores: [
      'test/example*',
      'README.md',
    ],
  },
)
