import { Editor } from '@/components/editor'
import { ErrorBoundary } from '@/components/ui/error-boundary'
import { getContent } from '@/i18n'

export const Write = () => {
  return (
    <div className="px-1 overscroll-contain" data-testid="write-page">
      <ErrorBoundary>
        <Editor id="your_doc" placeholder={getContent('editor.placeholder')} data-testid="editor" />
      </ErrorBoundary>
    </div>
  )
}
