import { Editor } from '@/components/editor'
import { getContent } from '@/i18n'

export const Write = () => {
  return (
    <div className="px-1 min-w-dvw min-h-dvh fixed bg-(--background)">
      <Editor id="your_doc" placeholder={getContent('editor.placeholder')} />
    </div>
  )
}
