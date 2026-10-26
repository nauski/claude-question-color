import { expect, test } from 'claude-code/testing'

import { split } from './register'

test('marks Q: and trailing-? lines, skips code fences', () => {
  const segs = split('Done.\n\n`Q: ship it?`\n```\nwhy?\n```\nok')
  expect(segs.filter(s => s.q).map(s => s.text)).toEqual(['`Q: ship it?`'])
})

test('plain prose has no question', () => {
  expect(split('no questions here').some(s => s.q)).toBe(false)
})

test('a question mid-line counts', () => {
  expect(split('Should I send it? It will ask you first.').some(s => s.q)).toBe(true)
})

test('a ? inside inline code or a URL query does not count', () => {
  expect(split('Run `ls?` or open https://x.test/?a=1 now.').some(s => s.q)).toBe(false)
})

