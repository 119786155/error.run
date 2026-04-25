import { describe, expect, it } from 'vitest'
import { ParagraphElement } from '../../../src/components/ui/paragraph-node'

describe('ParagraphElement', () => {
  it('should export ParagraphElement component', () => {
    expect(ParagraphElement).toBeDefined()
    expect(typeof ParagraphElement).toBe('function')
  })
})
