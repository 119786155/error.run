import { describe, expect, it } from 'vitest'
import { BorderAllIcon, BorderBottomIcon } from '../../../src/components/ui/table-icons'

describe('TableIcons', () => {
  it('should export BorderAllIcon component', () => {
    expect(BorderAllIcon).toBeDefined()
    expect(typeof BorderAllIcon).toBe('function')
  })

  it('should export BorderBottomIcon component', () => {
    expect(BorderBottomIcon).toBeDefined()
    expect(typeof BorderBottomIcon).toBe('function')
  })
})
