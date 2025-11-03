'use client'

import { useToggleToolbarButton, useToggleToolbarButtonState } from '@platejs/toggle/react'
import { ListCollapseIcon } from 'lucide-react'
import type * as React from 'react'
import { getContent } from '@/i18n'
import { ToolbarButton } from './toolbar'

export function ToggleToolbarButton(props: React.ComponentProps<typeof ToolbarButton>) {
  const state = useToggleToolbarButtonState()
  const { props: buttonProps } = useToggleToolbarButton(state)

  return (
    <ToolbarButton {...props} {...buttonProps} tooltip={getContent('editor.list.toggle')}>
      <ListCollapseIcon />
    </ToolbarButton>
  )
}
