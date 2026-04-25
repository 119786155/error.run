import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Button, buttonVariants } from '../../../src/components/ui/button'

describe('Button', () => {
  it('should render button with default variant', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeDefined()
  })

  it('should render button with different variants', () => {
    const { rerender } = render(<Button variant="default">Default</Button>)
    expect(screen.getByText('Default')).toBeDefined()

    rerender(<Button variant="destructive">Destructive</Button>)
    expect(screen.getByText('Destructive')).toBeDefined()

    rerender(<Button variant="outline">Outline</Button>)
    expect(screen.getByText('Outline')).toBeDefined()

    rerender(<Button variant="secondary">Secondary</Button>)
    expect(screen.getByText('Secondary')).toBeDefined()

    rerender(<Button variant="ghost">Ghost</Button>)
    expect(screen.getByText('Ghost')).toBeDefined()

    rerender(<Button variant="link">Link</Button>)
    expect(screen.getByText('Link')).toBeDefined()
  })

  it('should render button with different sizes', () => {
    const { rerender } = render(<Button size="default">Default</Button>)
    expect(screen.getByText('Default')).toBeDefined()

    rerender(<Button size="sm">Small</Button>)
    expect(screen.getByText('Small')).toBeDefined()

    rerender(<Button size="lg">Large</Button>)
    expect(screen.getByText('Large')).toBeDefined()

    rerender(<Button size="icon">Icon</Button>)
    expect(screen.getByText('Icon')).toBeDefined()
  })

  it('should handle click events', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click</Button>)
    screen.getByText('Click').click()
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should be disabled when disabled prop is passed', () => {
    render(<Button disabled>Disabled</Button>)
    const button = screen.getByText('Disabled') as HTMLButtonElement
    expect(button.disabled).toBe(true)
  })

  it('should render as child when asChild is true', () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>,
    )
    expect(screen.getByText('Link Button')).toBeDefined()
  })

  it('should apply custom className', () => {
    render(<Button className="custom-class">Custom</Button>)
    const button = screen.getByText('Custom')
    expect(button.className).toContain('custom-class')
  })
})

describe('buttonVariants', () => {
  it('should return default classes', () => {
    const classes = buttonVariants({})
    expect(typeof classes).toBe('string')
    expect(classes.length).toBeGreaterThan(0)
  })

  it('should apply variant classes', () => {
    const defaultClasses = buttonVariants({ variant: 'default' })
    const destructiveClasses = buttonVariants({ variant: 'destructive' })
    expect(defaultClasses).not.toBe(destructiveClasses)
  })

  it('should apply size classes', () => {
    const smClasses = buttonVariants({ size: 'sm' })
    const lgClasses = buttonVariants({ size: 'lg' })
    expect(smClasses).not.toBe(lgClasses)
  })
})
