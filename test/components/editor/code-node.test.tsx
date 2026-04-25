import { describe, expect, it } from 'vitest'
import { CodeLeaf } from '../../../src/components/ui/code-node'

describe('CodeLeaf', () => {
  it('should export CodeLeaf component', () => {
    expect(CodeLeaf).toBeDefined()
    expect(typeof CodeLeaf).toBe('function')
  })
})
