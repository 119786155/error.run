import { Baseline, Bold, Highlighter, Italic, PaintBucket } from 'lucide-react'
import type { Value } from 'platejs'
import { Plate, usePlateEditor } from 'platejs/react'
import { BaseEditorKit } from '@/components/editor/editor-base-kit'
import { CommentToolbarButton } from '@/components/ui/comment-toolbar-button'
import { Editor, EditorContainer } from '@/components/ui/editor'
import { EmojiToolbarButton } from '@/components/ui/emoji-toolbar-button'
import { ExportToolbarButton } from '@/components/ui/export-toolbar-button'
import { FixedToolbar } from '@/components/ui/fixed-toolbar'
import { FontColorToolbarButton } from '@/components/ui/font-color-toolbar-button'
import { FontSizeToolbarButton } from '@/components/ui/font-size-toolbar-button'
import { RedoToolbarButton, UndoToolbarButton } from '@/components/ui/history-toolbar-button'
import { ImportToolbarButton } from '@/components/ui/import-toolbar-button'
import { IndentToolbarButton, OutdentToolbarButton } from '@/components/ui/indent-toolbar-button'
import { InsertBlocksButton } from '@/components/ui/insert-blocks-button.tsx'
import {
  BulletedListToolbarButton,
  NumberedListToolbarButton,
  TodoListToolbarButton,
} from '@/components/ui/list-toolbar-button'
import { MarkToolbarButton } from '@/components/ui/mark-toolbar-button'
import { ToggleToolbarButton } from '@/components/ui/toggle-toolbar-button'
import { ToolbarSeparator } from '@/components/ui/toolbar'
import { getContent } from '@/i18n'

const Separator = () => <ToolbarSeparator className="h-[20px]" />

export const TextEditor = ({ placeholder, initialValue }: { placeholder: string; initialValue: Value }) => {
  const editor = usePlateEditor({
    plugins: [...BaseEditorKit],
    value: initialValue,
  })

  return (
    <Plate editor={editor}>
      <FixedToolbar className="justify-start rounded-t-lg">
        <UndoToolbarButton />

        <RedoToolbarButton />

        <Separator />

        <ExportToolbarButton />

        <ImportToolbarButton />

        <Separator />

        <InsertBlocksButton editor={editor} toggle={(type: string) => editor.tf[type].toggle()} />

        <FontSizeToolbarButton />

        <Separator />

        <MarkToolbarButton nodeType="bold" tooltip={getContent('editor.bold')}>
          <Bold />
        </MarkToolbarButton>

        <MarkToolbarButton nodeType="italic" tooltip={getContent('editor.italic')}>
          <Italic />
        </MarkToolbarButton>

        <FontColorToolbarButton nodeType="color" tooltip={getContent('editor.txtcolor')}>
          <Baseline />
        </FontColorToolbarButton>

        <FontColorToolbarButton nodeType="backgroundColor" tooltip={getContent('editor.bgcolor')}>
          <PaintBucket />
        </FontColorToolbarButton>

        <EmojiToolbarButton />

        <Separator />

        <MarkToolbarButton nodeType="highlight" tooltip={getContent('editor.highlight')}>
          <Highlighter />
        </MarkToolbarButton>

        <CommentToolbarButton />

        <Separator />

        <IndentToolbarButton />

        <OutdentToolbarButton />

        <Separator />

        <BulletedListToolbarButton />

        <NumberedListToolbarButton />

        <TodoListToolbarButton />

        <ToggleToolbarButton />
      </FixedToolbar>
      <EditorContainer>
        <Editor placeholder={placeholder} />
      </EditorContainer>
    </Plate>
  )
}
