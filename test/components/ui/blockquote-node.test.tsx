import { describe, expect, it } from 'vitest'
import { BlockquoteElement } from '../../../src/components/ui/blockquote-node'

describe('BlockquoteElement', () => {
  it('should export BlockquoteElement component', () => {
    expect(BlockquoteElement).toBeDefined()
    expect(typeof BlockquoteElement).toBe('function')
  })
})
