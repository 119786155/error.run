import { FontBackgroundColorPlugin, FontColorPlugin, FontSizePlugin } from '@platejs/basic-styles/react'
import { CalloutPlugin } from '@platejs/callout/react'
import { CodeBlockKit } from '@/components/editor/plugins/code-block-kit'
import { DndKit } from '@/components/editor/plugins/dnd-kit'
import { EmojiKit } from '@/components/editor/plugins/emoji-kit'
import { IndentKit } from '@/components/editor/plugins/indent-kit'
import { ListKit } from '@/components/editor/plugins/list-kit'
import { MarkdownKit } from '@/components/editor/plugins/markdown-kit'
import { TableKit } from '@/components/editor/plugins/table-kit'
import { ToggleKit } from '@/components/editor/plugins/toggle-kit'
import { CalloutElement } from '@/components/ui/callout-node'
import { BasicBlocksKit } from './plugins/basic-blocks-kit'
import { BasicMarksKit } from './plugins/basic-marks-kit'

export const EditorKit = [
  ...BasicBlocksKit,

  CalloutPlugin.withComponent(CalloutElement),

  ...TableKit,

  ...CodeBlockKit,

  ...BasicMarksKit,

  FontColorPlugin,

  FontBackgroundColorPlugin,

  FontSizePlugin,

  ...MarkdownKit,

  ...EmojiKit,

  ...ListKit,

  ...ToggleKit,

  ...IndentKit,

  ...DndKit,
]
