import { expect, test } from 'claude-code/testing'

import { split } from './register'

test('marks Q: and trailing-? lines, skips code fences', () => {
  const segs = split('Done.\n\n`Q: ship it?`\n```\nwhy?\n```\nok')
  expect(segs.filter(s => s.q).map(s => s.text)).toEqual(['`Q: ship it?`'])
})

test('plain prose has no question', () => {
  expect(split('no questions here').some(s => s.q)).toBe(false)
})
