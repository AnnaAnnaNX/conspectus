import { expect, describe, it } from 'vitest'
import {parseText} from "../utils/parseText";

describe('test function parseText', () => {
  it('empty text', () => {
    expect(parseText('')).toBe('')
  })
  it('empty paragraphs', () => {
    expect(parseText('\n\n')).toBe('')
    expect(parseText('  \n  \n  ')).toBe('')
  })
  it('one paragraph', () => {
    expect(parseText('one two')).toBe('<div><span class="all">one two</span></div>')
    expect(parseText('   one two   ')).toBe('<div><span class="all">one two</span></div>')
    expect(parseText(' \n  one two  \n   ')).toBe('<div><span class="all">one two</span></div>')
  })
  it('two paragraphs', () => {
    expect(parseText('one two\nthree')).toBe('<div><span class="all">one two</span></div>\n<div><span class="all">three</span></div>')
    expect(parseText(' one two \n three ')).toBe('<div><span class="all">one two</span></div>\n<div><span class="all">three</span></div>')
    expect(parseText('one two \n three \n ')).toBe('<div><span class="all">one two</span></div>\n<div><span class="all">three</span></div>')
  })
})
