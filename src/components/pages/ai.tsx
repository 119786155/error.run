import { Editor } from '@/components/editor'
import { getContent } from '@/i18n'

export const AI = () => {
  return (
    <div className="px-1 overscroll-contain">
      <Editor id="your_doc_with_ai" placeholder={getContent('editor.placeholder')} enableAI={true} />
    </div>
  )
}
