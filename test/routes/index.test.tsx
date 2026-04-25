import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Poem } from '../../src/components/pages/poem'

describe('Poem page', () => {
  it('should render poem page', () => {
    render(<Poem />)
    const background = document.querySelector('.background')
    expect(background).not.toBeNull()
  })

  it('should render poem container', () => {
    render(<Poem />)
    const container = document.querySelector('.poem-container')
    expect(container).not.toBeNull()
  })

  it('should render title', () => {
    render(<Poem />)
    const title = document.querySelector('h1')
    expect(title).not.toBeNull()
  })

  it('should render 4 paragraphs', () => {
    render(<Poem />)
    const paragraphs = document.querySelectorAll('p.leading-3')
    expect(paragraphs.length).toBe(4)
  })

  it('should render footer', () => {
    render(<Poem />)
    const footer = document.querySelector('footer')
    expect(footer).not.toBeNull()
  })

  it('should render animated dots', () => {
    render(<Poem />)
    const dots = document.querySelectorAll('.background > span')
    expect(dots.length).toBeGreaterThan(0)
  })
})
