import { describe, expect, it } from 'vitest'
import { CalloutElement } from '../../../src/components/ui/callout-node'

describe('CalloutElement', () => {
  it('should export CalloutElement component', () => {
    expect(CalloutElement).toBeDefined()
    expect(typeof CalloutElement).toBe('function')
  })
})
