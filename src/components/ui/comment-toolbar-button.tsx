'use client'

import { MessageSquareTextIcon } from 'lucide-react'
import { useEditorRef } from 'platejs/react'
import { commentPlugin } from '@/components/editor/plugins/comment-kit'
import { ToolbarButton } from './toolbar'
import { getContent } from '@/i18n'

export function CommentToolbarButton() {
  const editor = useEditorRef()

  return (
    <ToolbarButton
      onClick={() => {
        editor.getTransforms(commentPlugin).comment.setDraft()
      }}
      data-plate-prevent-overlay
      tooltip={getContent('editor.comment')}
    >
      <MessageSquareTextIcon />
    </ToolbarButton>
  )
}
