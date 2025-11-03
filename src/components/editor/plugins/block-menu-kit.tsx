'use client'

import { BlockMenuPlugin } from '@platejs/selection/react'
import { BlockContextMenu } from '@/components/ui/block-context-menu'

export const BlockMenuKit = [
  BlockMenuPlugin.configure({
    render: { aboveEditable: BlockContextMenu },
  }),
]
