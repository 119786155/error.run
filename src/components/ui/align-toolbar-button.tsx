'use client'

import type { Alignment } from '@platejs/basic-styles'
import { TextAlignPlugin } from '@platejs/basic-styles/react'
import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu'
import { AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon } from 'lucide-react'
import { useEditorPlugin, useSelectionFragmentProp } from 'platejs/react'
import * as React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { getContent } from '@/i18n'

import { ToolbarButton } from './toolbar'

const items = [
  {
    icon: AlignLeftIcon,
    value: 'left',
    desc: getContent('editor.alignleft'),
  },
  {
    icon: AlignCenterIcon,
    value: 'center',
    desc: getContent('editor.aligncenter'),
  },
  {
    icon: AlignRightIcon,
    value: 'right',
    desc: getContent('editor.alignright'),
  },
  {
    icon: AlignJustifyIcon,
    value: 'justify',
    desc: getContent('editor.alignjustify'),
  },
]

export function AlignToolbarButton(props: DropdownMenuProps) {
  const { editor, tf } = useEditorPlugin(TextAlignPlugin)
  const value =
    useSelectionFragmentProp({
      defaultValue: 'start',
      getProp: (node) => node.align,
    }) ?? 'left'

  const [open, setOpen] = React.useState(false)
  const IconValue = items.find((item) => item.value === value)?.icon ?? AlignLeftIcon

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton pressed={open} tooltip={getContent('editor.align')} isDropdown>
          <IconValue />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="min-w-0" align="start">
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(value) => {
            tf.textAlign.setNodes(value as Alignment)
            editor.tf.focus()
          }}
        >
          {items.map(({ icon: Icon, value: itemValue, desc }) => (
            <DropdownMenuRadioItem
              key={itemValue}
              className="pl-2 data-[state=checked]:bg-accent *:first:[span]:hidden"
              value={itemValue}
            >
              <Icon /> {desc}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
