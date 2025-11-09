import { FontBackgroundColorPlugin, FontColorPlugin, FontSizePlugin } from '@platejs/basic-styles/react'
import { CalloutPlugin } from '@platejs/callout/react'
import { CodeBlockKit } from '@/components/editor/plugins/code-block-kit'
import { CommentKit } from '@/components/editor/plugins/comment-kit'
import { DndKit } from '@/components/editor/plugins/dnd-kit'
import { EmojiKit } from '@/components/editor/plugins/emoji-kit'
import { IndentKit } from '@/components/editor/plugins/indent-kit'
import { ListKit } from '@/components/editor/plugins/list-kit'
import { MarkdownKit } from '@/components/editor/plugins/markdown-kit'
import { TableKit } from '@/components/editor/plugins/table-kit'
import { ToggleKit } from '@/components/editor/plugins/toggle-kit'
import { CalloutElement } from '@/components/ui/callout-node'
import { BaseBasicBlocksKit } from './plugins/basic-blocks-base-kit'
import { BaseBasicMarksKit } from './plugins/basic-marks-base-kit'

export const BaseEditorKit = [
  ...BaseBasicBlocksKit,

  CalloutPlugin.withComponent(CalloutElement),

  ...TableKit,

  ...CodeBlockKit,

  ...BaseBasicMarksKit,

  FontColorPlugin,

  FontBackgroundColorPlugin,

  FontSizePlugin,

  ...MarkdownKit,

  ...EmojiKit,

  ...ListKit,

  ...ToggleKit,

  ...IndentKit,

  ...DndKit,

  ...CommentKit,
]
