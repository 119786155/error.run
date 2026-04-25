import { describe, expect, it } from 'vitest'
import { EmojiInputElement } from '../../../src/components/ui/emoji-node'

describe('EmojiInputElement', () => {
  it('should export EmojiInputElement component', () => {
    expect(EmojiInputElement).toBeDefined()
    expect(typeof EmojiInputElement).toBe('function')
  })
})
