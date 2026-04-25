import { describe, expect, it } from 'vitest'
import { LinkElement } from '../../../src/components/ui/link-node'

describe('LinkElement', () => {
  it('should export LinkElement component', () => {
    expect(LinkElement).toBeDefined()
    expect(typeof LinkElement).toBe('function')
  })
})
