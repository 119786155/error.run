import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Checkbox } from '../../../src/components/ui/checkbox'

describe('Checkbox', () => {
  it('should render checkbox', () => {
    render(<Checkbox />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeDefined()
  })

  it('should render checkbox with label', () => {
    render(
      <label htmlFor="terms">
        <Checkbox id="terms" />
        Accept terms
      </label>,
    )
    expect(screen.getByText('Accept terms')).toBeDefined()
  })

  it('should be checked when checked prop is true', () => {
    render(<Checkbox checked />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox.getAttribute('data-state')).toBe('checked')
  })

  it('should be unchecked when checked prop is false', () => {
    render(<Checkbox checked={false} />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox.getAttribute('data-state')).toBe('unchecked')
  })

  it('should be disabled when disabled prop is passed', () => {
    render(<Checkbox disabled />)
    const checkbox = screen.getByRole('checkbox') as HTMLButtonElement
    expect(checkbox.disabled).toBe(true)
  })

  it('should apply custom className', () => {
    render(<Checkbox className="custom-checkbox" />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox.className).toContain('custom-checkbox')
  })
})
