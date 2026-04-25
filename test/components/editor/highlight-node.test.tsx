import { describe, expect, it } from 'vitest'
import { HighlightLeaf } from '../../../src/components/ui/highlight-node'

describe('HighlightLeaf', () => {
  it('should export HighlightLeaf component', () => {
    expect(HighlightLeaf).toBeDefined()
    expect(typeof HighlightLeaf).toBe('function')
  })
})
