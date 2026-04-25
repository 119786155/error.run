import { describe, expect, it } from 'vitest'
import { DateElement } from '../../../src/components/ui/date-node'

describe('DateElement', () => {
  it('should export DateElement component', () => {
    expect(DateElement).toBeDefined()
    expect(typeof DateElement).toBe('function')
  })
})
