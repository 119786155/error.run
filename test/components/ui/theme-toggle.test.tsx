import { describe, expect, it } from 'vitest'
import { ThemeToggle } from '../../../src/components/ui/theme-toggle'

describe('ThemeToggle', () => {
  it('should export ThemeToggle component', () => {
    expect(ThemeToggle).toBeDefined()
    expect(typeof ThemeToggle).toBe('function')
  })
})
