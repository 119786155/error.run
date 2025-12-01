import { Editor } from '@/components/editor'
import { getContent } from '@/i18n'

export const Write = () => {
  return (
    <div className="px-1 overscroll-contain">
      <Editor id="your_doc" placeholder={getContent('editor.placeholder')} />
    </div>
  )
}
