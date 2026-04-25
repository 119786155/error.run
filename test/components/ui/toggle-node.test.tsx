import { describe, expect, it } from 'vitest'
import { ToggleElement } from '../../../src/components/ui/toggle-node'

describe('ToggleElement', () => {
  it('should export ToggleElement component', () => {
    expect(ToggleElement).toBeDefined()
    expect(typeof ToggleElement).toBe('function')
  })
})
