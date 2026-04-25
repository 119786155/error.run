import { describe, expect, it } from 'vitest'
import { HrElement } from '../../../src/components/ui/hr-node'

describe('HrElement', () => {
  it('should export HrElement component', () => {
    expect(HrElement).toBeDefined()
    expect(typeof HrElement).toBe('function')
  })
})
