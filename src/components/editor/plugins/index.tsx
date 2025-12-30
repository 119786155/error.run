import { AutoformatKit } from '@/components/editor/plugins/autoformat-kit'
import { BasicBlocksKit } from '@/components/editor/plugins/basic-blocks-kit'
import { BasicMarksKit } from '@/components/editor/plugins/basic-marks-kit'
import { BlockMenuKit } from '@/components/editor/plugins/block-menu-kit'
import { BlockSelectionKit } from '@/components/editor/plugins/block-selection-kit'
import { CodeBlockKit } from '@/components/editor/plugins/code-block-kit'
import { ColumnKit } from '@/components/editor/plugins/column-kit'
import { CursorOverlayKit } from '@/components/editor/plugins/cursor-overlay-kit'
import { DateKit } from '@/components/editor/plugins/date-kit'
import { DndKit } from '@/components/editor/plugins/dnd-kit'
import { EmojiKit } from '@/components/editor/plugins/emoji-kit'
import { ExcalidrawKit } from '@/components/editor/plugins/excalidraw-kit'
import { ExitBreakKit } from '@/components/editor/plugins/exit-break-kit'
import { FixedToolbarKit } from '@/components/editor/plugins/fixed-toolbar-kit'
import { IndentKit } from '@/components/editor/plugins/indent-kit'
import { LineHeightKit } from '@/components/editor/plugins/line-height-kit'
import { LinkKit } from '@/components/editor/plugins/link-kit'
import { ListKit } from '@/components/editor/plugins/list-kit'
import { MarkdownKit } from '@/components/editor/plugins/markdown-kit'
import { MathKit } from '@/components/editor/plugins/math-kit'
import { MediaKit } from '@/components/editor/plugins/media-kit'
import { SlashKit } from '@/components/editor/plugins/slash-kit'
import { TableKit } from '@/components/editor/plugins/table-kit'
import { TocKit } from '@/components/editor/plugins/toc-kit'
import { ToggleKit } from '@/components/editor/plugins/toggle-kit'
import { YjsKit } from '@/components/editor/plugins/yjs-kit'

type Options = {
  disableToolbar: boolean
  enableCollaboration: boolean
}

export const getEditorKit = (options?: Options) => {
  const kits = [
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

    ...ExcalidrawKit,

    ...TocKit,

    ...ExitBreakKit,

    ...AutoformatKit,

    ...BlockSelectionKit,

    ...BlockMenuKit,

    ...SlashKit,

    ...CursorOverlayKit,

    ...MediaKit,
  ]

  //@ts-expect-error
  if (options?.enableCollaboration) kits.push(...YjsKit)

  if (options?.disableToolbar) return kits

  return [...kits, ...FixedToolbarKit]
}
