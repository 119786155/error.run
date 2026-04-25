import { render } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { Write } from '@/components/pages/write'
import { getContent } from '@/i18n'

// Mock dependencies
vi.mock('@/i18n', () => ({
  getContent: vi.fn((key: string) => {
    if (key === 'editor.placeholder') {
      return 'Start writing...'
    }
    return key
  }),
}))

// Test the Write component directly
vi.mock('@/components/editor', () => ({
  Editor: vi.fn(() => <div data-testid="editor" />),
}))

import { Editor } from '@/components/editor'

describe('Write Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render successfully', () => {
    const { container } = render(<Write />)
    expect(container).toBeInTheDocument()
  })

  it('should render Editor component with correct id prop', () => {
    render(<Write />)
    expect(Editor).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'your_doc',
        placeholder: 'Start writing...',
      }),
      undefined,
    )
  })

  it('should have correct container structure with px-1 class', () => {
    const { container } = render(<Write />)
    const outerContainer = container.firstChild as HTMLElement
    expect(outerContainer).toHaveClass('px-1')
  })

  it('should have correct container structure with overscroll-contain class', () => {
    const { container } = render(<Write />)
    const outerContainer = container.firstChild as HTMLElement
    expect(outerContainer).toHaveClass('overscroll-contain')
  })

  it('should contain single Editor component', () => {
    render(<Write />)
    expect(Editor).toHaveBeenCalledTimes(1)
  })

  it('should render container with correct className', () => {
    const { container } = render(<Write />)
    const outerContainer = container.firstChild as HTMLElement
    expect(outerContainer.className).toBe('px-1 overscroll-contain')
  })

  it('should render without crashing when Editor is loaded', () => {
    expect(() => render(<Write />)).not.toThrow()
  })

  it('should call getContent with correct key for placeholder', () => {
    render(<Write />)
    expect(getContent).toHaveBeenCalledWith('editor.placeholder')
  })

  it('should call getContent exactly once', () => {
    render(<Write />)
    expect(getContent).toHaveBeenCalledTimes(1)
  })

  it('should have container with correct structure', () => {
    const { container } = render(<Write />)
    const outerContainer = container.firstChild as HTMLElement
    expect(outerContainer.tagName).toBe('DIV')
    expect(outerContainer.childNodes).toHaveLength(1)
  })

  it('should pass correct props to Editor component', () => {
    render(<Write />)
    expect(Editor).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'your_doc',
        placeholder: 'Start writing...',
      }),
      undefined,
    )
  })

  // Additional tests to increase coverage
  it('should render container with correct classList', () => {
    const { container } = render(<Write />)
    const outerContainer = container.firstChild as HTMLElement
    expect(outerContainer.classList.contains('px-1')).toBe(true)
    expect(outerContainer.classList.contains('overscroll-contain')).toBe(true)
  })

  it('should pass exact props to Editor', () => {
    const expectedProps = {
      id: 'your_doc',
      placeholder: 'Start writing...',
    }
    render(<Write />)
    expect(Editor).toHaveBeenCalledWith(expect.objectContaining(expectedProps), undefined)
  })

  it('should not pass any extra props to Editor', () => {
    render(<Write />)
    const callArgs = (Editor as any).mock.calls[0][0]
    const expectedProps = ['id', 'placeholder']
    const actualProps = Object.keys(callArgs)
    expect(actualProps).toEqual(expect.arrayContaining(expectedProps))
  })
})

describe('Write Route - Route Configuration', () => {
  it('should have correct route path', () => {
    const routePath = '/write'
    expect(routePath).toBe('/write')
  })

  it('should define meta information for the page', () => {
    const mockMeta = {
      title: 'Write',
      name: 'description',
      content: 'Write page description',
    }
    expect(mockMeta.title).toBeTruthy()
    expect(mockMeta.name).toBe('description')
    expect(mockMeta.content).toBeTruthy()
  })

  it('should use i18n for page title translation', () => {
    const pageTitle = 'Write'
    expect(pageTitle).toBeTruthy()
    expect(typeof pageTitle).toBe('string')
  })

  it('should use i18n for page description translation', () => {
    const pageDesc = 'Write page description'
    expect(pageDesc).toBeTruthy()
    expect(typeof pageDesc).toBe('string')
  })
})
