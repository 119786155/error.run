import type { Value } from 'platejs'
import type { PlateEditor } from 'platejs/react'
import { Plate, usePlateEditor } from 'platejs/react'
import { useCallback } from 'react'
import { getEditorKit } from '@/components/editor/plugins'
import { EditorContainer, Editor as MyPlateEditor } from '@/components/ui/editor'
import { init } from '@/models'
import { get, KEY_PATH, put } from '@/models/doc'

type Doc = {
  [KEY_PATH]: string
  content: Value
}

type EditorProps = {
  id?: string
  placeholder?: string
  staticValue?: Value
}

export const Editor = ({ id, placeholder, staticValue }: EditorProps) => {
  const asyncValue = async () => {
    await init()

    const doc = (await get(id as string)) as Doc

    return doc?.content || []
  }

  const editor = usePlateEditor({
    plugins: [...getEditorKit({ disableToolbar: !!staticValue })],
    value: staticValue ? staticValue : asyncValue,
  })

  const onChange = useCallback(
    ({ editor, value }: { editor: PlateEditor; value: Value }) => {
      if (!id) return

      const isAstChange = editor.operations.some((op) => 'set_selection' !== op.type)

      if (!isAstChange || !value) return

      put({ [KEY_PATH]: id, content: value } as Doc)
    },
    [id],
  )

  return (
    <Plate editor={editor} onChange={onChange} readOnly={!!staticValue}>
      <EditorContainer className="h-dvh">
        <MyPlateEditor placeholder={placeholder} />
      </EditorContainer>
    </Plate>
  )
}
