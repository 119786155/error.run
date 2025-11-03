'use client'

import { Redo2Icon, Undo2Icon } from 'lucide-react'
import { useEditorRef, useEditorSelector } from 'platejs/react'
import type * as React from 'react'
import { getContent } from '@/i18n'
import { ToolbarButton } from './toolbar'

export function RedoToolbarButton(props: React.ComponentProps<typeof ToolbarButton>) {
  const editor = useEditorRef()
  const disabled = useEditorSelector((editor) => editor.history.redos.length === 0, [])

  return (
    <ToolbarButton
      {...props}
      disabled={disabled}
      onClick={() => editor.redo()}
      onMouseDown={(e) => e.preventDefault()}
      tooltip={getContent('editor.redo')}
    >
      <Redo2Icon />
    </ToolbarButton>
  )
}

export function UndoToolbarButton(props: React.ComponentProps<typeof ToolbarButton>) {
  const editor = useEditorRef()
  const disabled = useEditorSelector((editor) => editor.history.undos.length === 0, [])

  return (
    <ToolbarButton
      {...props}
      disabled={disabled}
      onClick={() => editor.undo()}
      onMouseDown={(e) => e.preventDefault()}
      tooltip={getContent('editor.undo')}
    >
      <Undo2Icon />
    </ToolbarButton>
  )
}
