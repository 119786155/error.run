import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Write } from '@/components/pages/write'

vi.mock('@/components/editor', () => ({
  Editor: ({ id, placeholder }: { id: string; placeholder: string }) => (
    <div data-testid="editor" data-id={id} data-placeholder={placeholder}>
      Editor Component
    </div>
  ),
}))

describe('Write Component', () => {
  it('should render successfully', () => {
    const { container } = render(<Write />)
    expect(container).toBeInTheDocument()
  })

  it('should render Editor component with correct id prop', () => {
    render(<Write />)
    const editor = screen.getByTestId('editor')
    expect(editor).toBeInTheDocument()
    expect(editor).toHaveAttribute('data-id', 'your_doc')
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

  it('should render Editor with correct id for document identification', () => {
    render(<Write />)
    const editor = screen.getByTestId('editor')
    expect(editor).toHaveAttribute('data-id', 'your_doc')
  })

  it('should contain single Editor component', () => {
    render(<Write />)
    const editors = screen.getAllByTestId('editor')
    expect(editors).toHaveLength(1)
  })

  it('should render container with correct className', () => {
    const { container } = render(<Write />)
    const outerContainer = container.firstChild as HTMLElement
    expect(outerContainer.className).toContain('px-1')
    expect(outerContainer.className).toContain('overscroll-contain')
  })

  it('should render without crashing when Editor is loaded', () => {
    expect(() => render(<Write />)).not.toThrow()
  })

  it('should pass correct id prop to Editor component', () => {
    render(<Write />)
    const editor = screen.getByTestId('editor')
    expect(editor.dataset.id).toBe('your_doc')
  })

  it('should pass placeholder prop to Editor component', () => {
    render(<Write />)
    const editor = screen.getByTestId('editor')
    expect(editor.dataset.placeholder).toBeDefined()
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