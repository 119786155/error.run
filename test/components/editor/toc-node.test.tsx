import { describe, expect, it } from 'vitest'
import { TocElement } from '../../../src/components/ui/toc-node'

describe('TocElement', () => {
  it('should export TocElement component', () => {
    expect(TocElement).toBeDefined()
    expect(typeof TocElement).toBe('function')
  })
})
