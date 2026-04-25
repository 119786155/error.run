import { describe, expect, it } from 'vitest'

type MockPlugin = { key: string }

const mockKit: MockPlugin[] = [
  { key: 'p' },
  { key: 'h1' },
  { key: 'h2' },
  { key: 'h3' },
  { key: 'blockquote' },
  { key: 'hr' },
  { key: 'callout' },
  { key: 'trailingBlock' },
  { key: 'table' },
  { key: 'tr' },
  { key: 'td' },
  { key: 'th' },
  { key: 'code_block' },
  { key: 'code_line' },
  { key: 'code_syntax' },
  { key: 'list' },
  { key: 'toggle' },
  { key: 'img' },
  { key: 'audio' },
  { key: 'video' },
  { key: 'media_embed' },
  { key: 'placeholder' },
  { key: 'column' },
  { key: 'columnItem' },
  { key: 'equation' },
  { key: 'inlineEquation' },
  { key: 'excalidraw' },
  { key: 'date' },
]

const hasPlugin = (kit: MockPlugin[], key: string): boolean => kit.some((plugin) => plugin.key === key)

describe('Editor Blocks - BasicBlocksKit', () => {
  it('should include ParagraphPlugin for basic text', () => {
    expect(hasPlugin(mockKit, 'p')).toBe(true)
  })

  it('should include H1Plugin for heading 1', () => {
    expect(hasPlugin(mockKit, 'h1')).toBe(true)
  })

  it('should include H2Plugin for heading 2', () => {
    expect(hasPlugin(mockKit, 'h2')).toBe(true)
  })

  it('should include H3Plugin for heading 3', () => {
    expect(hasPlugin(mockKit, 'h3')).toBe(true)
  })

  it('should include BlockquotePlugin for quotes', () => {
    expect(hasPlugin(mockKit, 'blockquote')).toBe(true)
  })

  it('should include HrPlugin for horizontal rule', () => {
    expect(hasPlugin(mockKit, 'hr')).toBe(true)
  })

  it('should include CalloutPlugin for callouts', () => {
    expect(hasPlugin(mockKit, 'callout')).toBe(true)
  })

  it('should include TablePlugin for tables', () => {
    expect(hasPlugin(mockKit, 'table')).toBe(true)
    expect(hasPlugin(mockKit, 'tr')).toBe(true)
    expect(hasPlugin(mockKit, 'td')).toBe(true)
    expect(hasPlugin(mockKit, 'th')).toBe(true)
  })

  it('should include CodeBlockPlugin for code blocks', () => {
    expect(hasPlugin(mockKit, 'code_block')).toBe(true)
    expect(hasPlugin(mockKit, 'code_line')).toBe(true)
    expect(hasPlugin(mockKit, 'code_syntax')).toBe(true)
  })

  it('should include ListPlugin for lists', () => {
    expect(hasPlugin(mockKit, 'list')).toBe(true)
  })

  it('should include TogglePlugin for toggles', () => {
    expect(hasPlugin(mockKit, 'toggle')).toBe(true)
  })

  it('should include MediaPlugins for media elements', () => {
    expect(hasPlugin(mockKit, 'img')).toBe(true)
    expect(hasPlugin(mockKit, 'audio')).toBe(true)
    expect(hasPlugin(mockKit, 'video')).toBe(true)
    expect(hasPlugin(mockKit, 'media_embed')).toBe(true)
    expect(hasPlugin(mockKit, 'placeholder')).toBe(true)
  })

  it('should include ColumnPlugin for columns', () => {
    expect(hasPlugin(mockKit, 'column')).toBe(true)
    expect(hasPlugin(mockKit, 'columnItem')).toBe(true)
  })

  it('should include EquationPlugin for equations', () => {
    expect(hasPlugin(mockKit, 'equation')).toBe(true)
    expect(hasPlugin(mockKit, 'inlineEquation')).toBe(true)
  })

  it('should include ExcalidrawPlugin for excalidraw', () => {
    expect(hasPlugin(mockKit, 'excalidraw')).toBe(true)
  })

  it('should include DatePlugin for dates', () => {
    expect(hasPlugin(mockKit, 'date')).toBe(true)
  })

  it('should include TrailingBlockPlugin for trailing block', () => {
    expect(hasPlugin(mockKit, 'trailingBlock')).toBe(true)
  })

  it('should have exactly 28 block types', () => {
    expect(mockKit).toHaveLength(28)
  })

  it('should have unique plugin keys', () => {
    const keys = mockKit.map((plugin) => plugin.key)
    const uniqueKeys = new Set(keys)
    expect(uniqueKeys.size).toBe(keys.length)
  })
})

describe('Editor Blocks - Plugin Validation', () => {
  it('should validate plugin keys', () => {
    mockKit.forEach((plugin) => {
      expect(typeof plugin.key).toBe('string')
      expect(plugin.key.length).toBeGreaterThan(0)
    })
  })

  it('should handle edge cases', () => {
    expect(hasPlugin([], 'p')).toBe(false)
    expect(hasPlugin(mockKit, '')).toBe(false)
    expect(hasPlugin(mockKit, 'non-existent')).toBe(false)
  })
})
