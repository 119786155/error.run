import { Editor } from '@/components/editor'
import { getContent } from '@/i18n'

export const Write = () => {
  return (
    <div className="mx-5 min-h-dvh">
      <Editor placeholder={getContent('editor.placeholder')} />
    </div>
  )
}
