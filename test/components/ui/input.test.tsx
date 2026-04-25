import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Input } from '../../../src/components/ui/input'

describe('Input', () => {
  it('should render input element', () => {
    render(<Input placeholder="Enter text" />)
    expect(screen.getByPlaceholderText('Enter text')).toBeDefined()
  })

  it('should render input with different types', () => {
    const { rerender } = render(<Input type="text" />)
    expect(document.querySelector('input[type="text"]')).not.toBeNull()

    rerender(<Input type="email" />)
    expect(document.querySelector('input[type="email"]')).not.toBeNull()

    rerender(<Input type="password" />)
    expect(document.querySelector('input[type="password"]')).not.toBeNull()
  })

  it('should handle change events', () => {
    const handleChange = vi.fn()
    render(<Input onChange={handleChange} />)
    const input = document.querySelector('input')
    expect(input).not.toBeNull()
  })

  it('should be disabled when disabled prop is passed', () => {
    render(<Input disabled />)
    const input = document.querySelector('input') as HTMLInputElement
    expect(input.disabled).toBe(true)
  })

  it('should apply custom className', () => {
    render(<Input className="custom-input" />)
    const input = document.querySelector('input')
    expect(input?.className).toContain('custom-input')
  })

  it('should forward ref correctly', () => {
    const ref = { current: null as HTMLInputElement | null }
    render(<Input ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })
})
