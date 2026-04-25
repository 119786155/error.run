import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Footer } from '../../../src/components/footer'

describe('Footer', () => {
  it('should render footer with links', () => {
    render(<Footer />)
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeDefined()
  })

  it('should contain two anchor links', () => {
    render(<Footer />)
    const links = screen.getAllByRole('link')
    expect(links.length).toBe(2)
  })
})
