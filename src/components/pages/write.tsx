import { Editor } from '@/components/editor'
import { getContent } from '@/i18n'

export const Write = () => {
  return (
    <div className="mx-5 h-[calc(100dvh-60px)]">
      <Editor id="your_doc" placeholder={getContent('editor.placeholder')} />
    </div>
  )
}
