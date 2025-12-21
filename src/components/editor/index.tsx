import { YjsPlugin } from '@platejs/yjs/react'
import type { Value } from 'platejs'
import type { PlateEditor } from 'platejs/react'
import { Plate, usePlateEditor } from 'platejs/react'
import { useCallback, useEffect } from 'react'
import { getEditorKit } from '@/components/editor/plugins'
import { EditorContainer, Editor as MyPlateEditor } from '@/components/ui/editor'
import { EditorStatus } from '@/components/ui/editor-status'
import { useMounted } from '@/hooks/use-mounted'
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
  enableCollaboration?: boolean
}

export const Editor = ({ id, placeholder, staticValue, enableCollaboration }: EditorProps) => {
  const mounted = useMounted()

  const asyncValue = async () => {
    await init()

    const doc = (await get(id as string)) as Doc

    return doc?.content || []
  }

  const editor = usePlateEditor({
    plugins: [...getEditorKit({ disableToolbar: !!staticValue })],
    value: staticValue ? staticValue : enableCollaboration ? [] : asyncValue,
    // Important: Skip Plate's default initialization when using Yjs
    // skipInitialization: !!enableCollaboration,
  })

  const onChange = useCallback(
    ({ editor, value }: { editor: PlateEditor; value: Value }) => {
      if (!id || enableCollaboration) return

      const isAstChange = editor.operations.some((op) => 'set_selection' !== op.type)

      if (!isAstChange || !value) return

      put({ [KEY_PATH]: id, content: value } as Doc)
    },
    [id],
  )

  useEffect(() => {
    if (!mounted || !enableCollaboration) return

    // Initialize Yjs connection, sync document, and set initial editor state
    editor.getApi(YjsPlugin).yjs.init({
      id,
    })

    // Clean up: Destroy connection when component unmounts
    return () => {
      editor.getApi(YjsPlugin).yjs.destroy()
    }
  }, [editor, mounted, enableCollaboration])

  return (
    <Plate editor={editor} onChange={onChange} readOnly={!!staticValue}>
      {enableCollaboration && <EditorStatus />}
      <EditorContainer className="h-dvh">
        <MyPlateEditor placeholder={placeholder} />
      </EditorContainer>
    </Plate>
  )
}
