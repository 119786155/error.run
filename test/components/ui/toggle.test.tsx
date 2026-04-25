import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Toggle, toggleVariants } from '../../../src/components/ui/toggle'

describe('Toggle', () => {
  it('should render toggle button', () => {
    render(<Toggle>Toggle</Toggle>)
    expect(screen.getByText('Toggle')).toBeDefined()
  })

  it('should render toggle with default variant', () => {
    render(<Toggle variant="default">Default</Toggle>)
    expect(screen.getByText('Default')).toBeDefined()
  })

  it('should render toggle with outline variant', () => {
    render(<Toggle variant="outline">Outline</Toggle>)
    expect(screen.getByText('Outline')).toBeDefined()
  })

  it('should render toggle with different sizes', () => {
    const { rerender } = render(<Toggle size="default">Default</Toggle>)
    expect(screen.getByText('Default')).toBeDefined()

    rerender(<Toggle size="sm">Small</Toggle>)
    expect(screen.getByText('Small')).toBeDefined()

    rerender(<Toggle size="lg">Large</Toggle>)
    expect(screen.getByText('Large')).toBeDefined()
  })

  it('should handle pressed state', () => {
    render(<Toggle pressed>Pressed</Toggle>)
    const toggle = screen.getByText('Pressed')
    expect(toggle.getAttribute('data-state')).toBe('on')
  })

  it('should handle unpressed state', () => {
    render(<Toggle pressed={false}>Unpressed</Toggle>)
    const toggle = screen.getByText('Unpressed')
    expect(toggle.getAttribute('data-state')).toBe('off')
  })

  it('should be disabled when disabled prop is passed', () => {
    render(<Toggle disabled>Disabled</Toggle>)
    const toggle = screen.getByText('Disabled') as HTMLButtonElement
    expect(toggle.disabled).toBe(true)
  })

  it('should apply custom className', () => {
    render(<Toggle className="custom-toggle">Custom</Toggle>)
    const toggle = screen.getByText('Custom')
    expect(toggle.className).toContain('custom-toggle')
  })
})

describe('toggleVariants', () => {
  it('should return default classes', () => {
    const classes = toggleVariants({})
    expect(typeof classes).toBe('string')
    expect(classes.length).toBeGreaterThan(0)
  })

  it('should apply variant classes', () => {
    const defaultClasses = toggleVariants({ variant: 'default' })
    const outlineClasses = toggleVariants({ variant: 'outline' })
    expect(defaultClasses).not.toBe(outlineClasses)
  })

  it('should apply size classes', () => {
    const smClasses = toggleVariants({ size: 'sm' })
    const lgClasses = toggleVariants({ size: 'lg' })
    expect(smClasses).not.toBe(lgClasses)
  })
})
