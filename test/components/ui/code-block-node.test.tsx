import { describe, expect, it } from 'vitest'
import { CodeBlockElement } from '../../../src/components/ui/code-block-node'

describe('CodeBlockElement', () => {
  it('should export CodeBlockElement component', () => {
    expect(CodeBlockElement).toBeDefined()
    expect(typeof CodeBlockElement).toBe('function')
  })
})
