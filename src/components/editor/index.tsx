import {
  Baseline,
  Bold,
  Code,
  Italic,
  Keyboard,
  PaintBucket,
  Strikethrough,
  Subscript,
  Superscript,
  Underline,
} from 'lucide-react'
import type { Value } from 'platejs'
import { KEYS } from 'platejs'
import type { PlateEditor } from 'platejs/react'
import { Plate, usePlateEditor } from 'platejs/react'
import { useCallback, useState } from 'react'
import { EditorKit } from '@/components/editor/plugins'
import { AlignToolbarButton } from '@/components/ui/align-toolbar-button'
import { EditorContainer, Editor as MyPlateEditor } from '@/components/ui/editor'
import { EmojiToolbarButton } from '@/components/ui/emoji-toolbar-button'
import { ExportToolbarButton } from '@/components/ui/export-toolbar-button'
import { FixedToolbar } from '@/components/ui/fixed-toolbar'
import { FontColorToolbarButton } from '@/components/ui/font-color-toolbar-button'
import { FontSizeToolbarButton } from '@/components/ui/font-size-toolbar-button'
import { RedoToolbarButton, UndoToolbarButton } from '@/components/ui/history-toolbar-button'
import { ImportToolbarButton } from '@/components/ui/import-toolbar-button'
import { IndentToolbarButton, OutdentToolbarButton } from '@/components/ui/indent-toolbar-button'
import { InsertToolbarButton } from '@/components/ui/insert-toolbar-button'
import { LineHeightToolbarButton } from '@/components/ui/line-height-toolbar-button'
import { MarkToolbarButton } from '@/components/ui/mark-toolbar-button'
import { MediaToolbarButton } from '@/components/ui/media-toolbar-button'
import { ModeToolbarButton } from '@/components/ui/mode-toolbar-button'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { ToolbarSeparator } from '@/components/ui/toolbar'
import { TurnIntoToolbarButton } from '@/components/ui/turn-into-toolbar-button'
import { getContent } from '@/i18n'
import { init } from '@/models'
import { get, KEY_PATH, put } from '@/models/doc'

const Separator = () => <ToolbarSeparator className="h-[20px]" />

const DOC_ID = 'your_doc'

type Doc = {
  [KEY_PATH]: string
  content: Value
}

export const Editor = ({ placeholder }: { placeholder: string }) => {
  const [readOnly, setReadOnly] = useState(false)

  const editor = usePlateEditor({
    plugins: [...EditorKit],
    value: async () => {
      await init()

      const doc = (await get(DOC_ID)) as Doc

      return doc?.content || []
    },
  })

  const onChange = useCallback(({ editor, value }: { editor: PlateEditor; value: Value }) => {
    const isAstChange = editor.operations.some((op) => 'set_selection' !== op.type)

    if (!isAstChange || !value) return

    put({ [KEY_PATH]: DOC_ID, content: value } as Doc)
  }, [])

  return (
    <Plate editor={editor} readOnly={readOnly} onChange={onChange}>
      <FixedToolbar className="justify-start rounded-t-lg">
        <ModeToolbarButton readOnly={readOnly} setReadOnly={setReadOnly} />

        <Separator />

        <UndoToolbarButton />

        <RedoToolbarButton />

        <Separator />

        <ExportToolbarButton />

        <ImportToolbarButton />

        <Separator />

        <InsertToolbarButton />

        <TurnIntoToolbarButton />

        <FontSizeToolbarButton />

        <Separator />

        <MarkToolbarButton nodeType="bold" tooltip={getContent('editor.bold')}>
          <Bold />
        </MarkToolbarButton>

        <MarkToolbarButton nodeType="italic" tooltip={getContent('editor.italic')}>
          <Italic />
        </MarkToolbarButton>

        <MarkToolbarButton nodeType="underline" tooltip={getContent('editor.underline')}>
          <Underline />
        </MarkToolbarButton>

        <MarkToolbarButton nodeType="strikethrough" tooltip={getContent('editor.strikethrough')}>
          <Strikethrough />
        </MarkToolbarButton>

        <MarkToolbarButton nodeType="code" tooltip={getContent('editor.code')}>
          <Code />
        </MarkToolbarButton>

        <MarkToolbarButton nodeType="kbd" tooltip={getContent('editor.kbd')}>
          <Keyboard />
        </MarkToolbarButton>

        <MarkToolbarButton nodeType="superscript" tooltip={getContent('editor.superscript')}>
          <Superscript />
        </MarkToolbarButton>

        <MarkToolbarButton nodeType="subscript" tooltip={getContent('editor.subscript')}>
          <Subscript />
        </MarkToolbarButton>

        <FontColorToolbarButton nodeType="color" tooltip={getContent('editor.txtcolor')}>
          <Baseline />
        </FontColorToolbarButton>

        <FontColorToolbarButton nodeType="backgroundColor" tooltip={getContent('editor.bgcolor')}>
          <PaintBucket />
        </FontColorToolbarButton>

        <EmojiToolbarButton />

        <MediaToolbarButton nodeType={KEYS.img} />

        <Separator />

        <LineHeightToolbarButton />

        <AlignToolbarButton />

        <IndentToolbarButton />

        <OutdentToolbarButton />

        <Separator />

        <ThemeToggle />
      </FixedToolbar>
      <EditorContainer>
        <MyPlateEditor placeholder={placeholder} />
      </EditorContainer>
    </Plate>
  )
}
