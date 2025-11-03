'use client'

import { BlockSelectionPlugin } from '@platejs/selection/react'
import { getPluginTypes, KEYS } from 'platejs'
import { BlockSelection } from '@/components/ui/block-selection'

export const BlockSelectionKit = [
  BlockSelectionPlugin.configure(({ editor }) => ({
    options: {
      isSelectable: (element, path) => {
        if (getPluginTypes(editor, [KEYS.column, KEYS.codeLine, KEYS.td]).includes(element.type)) {
          return false
        }

        // Exclude blocks inside table rows
        if (editor.api.block({ above: true, at: path, match: { type: 'tr' } })) {
          return false
        }

        return true
      },
    },
    render: {
      belowRootNodes: (props) => {
        if (!props.attributes.className?.includes('slate-selectable')) return null

        //@ts-expect-error
        return <BlockSelection {...props} />
      },
    },
  })),
]
