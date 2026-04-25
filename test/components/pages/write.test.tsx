import { render } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getContent } from '@/i18n'
import { Write } from '../../../src/components/pages/write'

vi.mock('@/i18n', () => ({
  getContent: vi.fn((key: string) => {
    if (key === 'editor.placeholder') {
      return 'Start writing...'
    }
    return key
  }),
}))

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

  it('should call getContent for placeholder', () => {
    render(<Write />)
    expect(getContent).toHaveBeenCalledWith('editor.placeholder')
  })

  it('should pass correct placeholder to Editor', () => {
    render(<Write />)
    expect(Editor).toHaveBeenCalledWith(
      expect.objectContaining({
        placeholder: 'Start writing...',
      }),
      undefined,
    )
  })

  it('should pass correct id to Editor', () => {
    render(<Write />)
    expect(Editor).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'your_doc',
      }),
      undefined,
    )
  })

  it('should have correct DOM structure', () => {
    const { container } = render(<Write />)
    expect(container.children).toHaveLength(1)
    const innerContainer = container.firstChild?.firstChild as HTMLElement
    expect(innerContainer).toBeInTheDocument()
  })
})

describe('Write Component - Edge Cases', () => {
  it('should handle empty state', () => {
    const { container } = render(<Write />)
    expect(container).toBeInTheDocument()
  })

  it('should handle different placeholder values', () => {
    const mockGetContent = vi.mocked(getContent)
    mockGetContent.mockReturnValue('Custom placeholder')

    render(<Write />)

    expect(Editor).toHaveBeenCalledWith(
      expect.objectContaining({
        placeholder: 'Custom placeholder',
      }),
      undefined,
    )
  })
})
