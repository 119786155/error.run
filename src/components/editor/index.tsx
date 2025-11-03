import { CodeBlockKit } from '@/components/editor/plugins/code-block-kit'
import { ColumnKit } from '@/components/editor/plugins/column-kit'
import { DateKit } from '@/components/editor/plugins/date-kit'
import { DndKit } from '@/components/editor/plugins/dnd-kit'
import { EmojiKit } from '@/components/editor/plugins/emoji-kit'
import { IndentKit } from '@/components/editor/plugins/indent-kit'
import { LineHeightKit } from '@/components/editor/plugins/line-height-kit'
import { LinkKit } from '@/components/editor/plugins/link-kit'
import { ListKit } from '@/components/editor/plugins/list-kit'
import { MarkdownKit } from '@/components/editor/plugins/markdown-kit'
import { MathKit } from '@/components/editor/plugins/math-kit'
import { TableKit } from '@/components/editor/plugins/table-kit'
import { ToggleKit } from '@/components/editor/plugins/toggle-kit'
import { BasicBlocksKit } from './plugins/basic-blocks-kit'
import { BasicMarksKit } from './plugins/basic-marks-kit'

export const EditorKit = [
  ...BasicBlocksKit,

  ...TableKit,

  ...CodeBlockKit,

  ...BasicMarksKit,

  ...LineHeightKit,

  ...MarkdownKit,

  ...EmojiKit,

  ...ListKit,

  ...ToggleKit,

  ...IndentKit,

  ...DndKit,

  ...LinkKit,

  ...MathKit,

  ...ColumnKit,

  ...DateKit,
]
