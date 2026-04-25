import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Separator } from '../../../src/components/ui/separator'

describe('Separator', () => {
  it('should render horizontal separator by default', () => {
    render(<Separator />)
    const separator = document.querySelector('[data-slot="separator"]')
    expect(separator).not.toBeNull()
    expect(separator?.getAttribute('data-orientation')).toBe('horizontal')
  })

  it('should render vertical separator', () => {
    render(<Separator orientation="vertical" />)
    const separator = document.querySelector('[data-slot="separator"]')
    expect(separator?.getAttribute('data-orientation')).toBe('vertical')
  })

  it('should be decorative by default', () => {
    render(<Separator />)
    const separator = document.querySelector('[data-slot="separator"]')
    expect(separator?.getAttribute('role')).toBe('none')
  })

  it('should not be decorative when specified', () => {
    render(<Separator decorative={false} orientation="horizontal" />)
    const separator = document.querySelector('[data-slot="separator"]')
    expect(separator?.getAttribute('role')).toBe('separator')
  })

  it('should apply custom className', () => {
    render(<Separator className="custom-separator" />)
    const separator = document.querySelector('[data-slot="separator"]')
    expect(separator?.className).toContain('custom-separator')
  })
})
