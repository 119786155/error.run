import { Editor } from '@/components/editor'
import { getContent } from '@/i18n'

export const Write = () => {
  return (
    <div className="px-1 overscroll-contain" data-testid="write-page">
      <Editor id="your_doc" placeholder={getContent('editor.placeholder')} data-testid="editor" />
    </div>
  )
}
