'use client'

import { useIndentButton, useOutdentButton } from '@platejs/indent/react'
import { IndentIcon, OutdentIcon } from 'lucide-react'
import type * as React from 'react'
import { getContent } from '@/i18n'
import { ToolbarButton } from './toolbar'

export function IndentToolbarButton(props: React.ComponentProps<typeof ToolbarButton>) {
  const { props: buttonProps } = useIndentButton()

  return (
    <ToolbarButton {...props} {...buttonProps} tooltip={getContent('editor.indent')}>
      <IndentIcon />
    </ToolbarButton>
  )
}

export function OutdentToolbarButton(props: React.ComponentProps<typeof ToolbarButton>) {
  const { props: buttonProps } = useOutdentButton()

  return (
    <ToolbarButton {...props} {...buttonProps} tooltip={getContent('editor.outdent')}>
      <OutdentIcon />
    </ToolbarButton>
  )
}
