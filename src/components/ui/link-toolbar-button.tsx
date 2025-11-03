'use client'

import { useLinkToolbarButton, useLinkToolbarButtonState } from '@platejs/link/react'
import { Link } from 'lucide-react'
import type * as React from 'react'
import { getContent } from '@/i18n'
import { ToolbarButton } from './toolbar'

export function LinkToolbarButton(props: React.ComponentProps<typeof ToolbarButton>) {
  const state = useLinkToolbarButtonState()
  const { props: buttonProps } = useLinkToolbarButton(state)

  return (
    <ToolbarButton {...props} {...buttonProps} data-plate-focus tooltip={getContent('editor.link')}>
      <Link />
    </ToolbarButton>
  )
}
