import { describe, expect, it } from 'vitest'
import { KbdLeaf } from '../../../src/components/ui/kbd-node'

describe('KbdLeaf', () => {
  it('should export KbdLeaf component', () => {
    expect(KbdLeaf).toBeDefined()
    expect(typeof KbdLeaf).toBe('function')
  })
})
