import { Editor } from '@/components/editor'
import { getContent } from '@/i18n'
import { ROOM_ID } from '@/lib/yjs'

export const Room = () => {
  return (
    <div className="px-1 overscroll-contain">
      <Editor id={ROOM_ID} placeholder={getContent('editor.placeholder')} enableCollaboration={true} />
    </div>
  )
}
