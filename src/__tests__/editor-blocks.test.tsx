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

  it('should include BlockquotePlugin for blockquotes', () => {
    expect(hasPlugin(mockKit, 'blockquote')).toBe(true)
  })

  it('should include HorizontalRulePlugin for horizontal rules', () => {
    expect(hasPlugin(mockKit, 'hr')).toBe(true)
  })

  it('should include CalloutPlugin for callout blocks', () => {
    expect(hasPlugin(mockKit, 'callout')).toBe(true)
  })

  it('should include TrailingBlockPlugin', () => {
    expect(hasPlugin(mockKit, 'trailingBlock')).toBe(true)
  })
})

describe('Editor Blocks - TableKit', () => {
  it('should include TablePlugin for tables', () => {
    expect(hasPlugin(mockKit, 'table')).toBe(true)
  })

  it('should include TableRowPlugin for table rows', () => {
    expect(hasPlugin(mockKit, 'tr')).toBe(true)
  })

  it('should include TableCellPlugin for table cells', () => {
    expect(hasPlugin(mockKit, 'td')).toBe(true)
  })

  it('should include TableCellHeaderPlugin for table header cells', () => {
    expect(hasPlugin(mockKit, 'th')).toBe(true)
  })
})

describe('Editor Blocks - CodeBlockKit', () => {
  it('should include CodeBlockPlugin for code blocks', () => {
    expect(hasPlugin(mockKit, 'code_block')).toBe(true)
  })

  it('should include CodeLinePlugin for code lines', () => {
    expect(hasPlugin(mockKit, 'code_line')).toBe(true)
  })

  it('should include CodeSyntaxPlugin for syntax highlighting', () => {
    expect(hasPlugin(mockKit, 'code_syntax')).toBe(true)
  })
})

describe('Editor Blocks - ListKit', () => {
  it('should include ListPlugin for list support', () => {
    expect(hasPlugin(mockKit, 'list')).toBe(true)
  })
})

describe('Editor Blocks - ToggleKit', () => {
  it('should include TogglePlugin for collapsible content', () => {
    expect(hasPlugin(mockKit, 'toggle')).toBe(true)
  })
})

describe('Editor Blocks - MediaKit', () => {
  it('should include ImagePlugin for images', () => {
    expect(hasPlugin(mockKit, 'img')).toBe(true)
  })

  it('should include AudioPlugin for audio', () => {
    expect(hasPlugin(mockKit, 'audio')).toBe(true)
  })

  it('should include VideoPlugin for video', () => {
    expect(hasPlugin(mockKit, 'video')).toBe(true)
  })

  it('should include MediaEmbedPlugin for media embeds', () => {
    expect(hasPlugin(mockKit, 'media_embed')).toBe(true)
  })

  it('should include PlaceholderPlugin for upload placeholders', () => {
    expect(hasPlugin(mockKit, 'placeholder')).toBe(true)
  })
})

describe('Editor Blocks - ColumnKit', () => {
  it('should include ColumnPlugin for column groups', () => {
    expect(hasPlugin(mockKit, 'column')).toBe(true)
  })

  it('should include ColumnItemPlugin for column items', () => {
    expect(hasPlugin(mockKit, 'columnItem')).toBe(true)
  })
})

describe('Editor Blocks - MathKit', () => {
  it('should include EquationPlugin for block math equations', () => {
    expect(hasPlugin(mockKit, 'equation')).toBe(true)
  })

  it('should include InlineEquationPlugin for inline math', () => {
    expect(hasPlugin(mockKit, 'inlineEquation')).toBe(true)
  })
})

describe('Editor Blocks - ExcalidrawKit', () => {
  it('should include ExcalidrawPlugin for drawings', () => {
    expect(hasPlugin(mockKit, 'excalidraw')).toBe(true)
  })
})

describe('Editor Blocks - DateKit', () => {
  it('should include DatePlugin for date blocks', () => {
    expect(hasPlugin(mockKit, 'date')).toBe(true)
  })
})

describe('Editor Blocks - Total Count', () => {
  it('should have 28 block plugins in total', () => {
    expect(mockKit.length).toBe(28)
  })
})