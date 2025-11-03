'use client'

import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu'
import { DropdownMenuItemIndicator } from '@radix-ui/react-dropdown-menu'
import {
  CheckIcon,
  Columns3Icon,
  FileCodeIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ListCollapseIcon,
  ListIcon,
  ListOrderedIcon,
  ListTodoIcon,
  PilcrowIcon,
  QuoteIcon,
} from 'lucide-react'
import type { TElement } from 'platejs'
import { KEYS } from 'platejs'
import { useEditorRef, useSelectionFragmentProp } from 'platejs/react'
import * as React from 'react'
import { getBlockType, setBlockType } from '@/components/editor/transforms'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { getContent } from '@/i18n'
import { ToolbarButton, ToolbarMenuGroup } from './toolbar'

export const turnIntoItems = [
  {
    icon: <PilcrowIcon />,
    keywords: ['paragraph'],
    label: getContent('editor.paragraph'),
    value: KEYS.p,
  },
  {
    icon: <Heading1Icon />,
    keywords: ['title', 'h1'],
    label: getContent('editor.h1'),
    value: 'h1',
  },
  {
    icon: <Heading2Icon />,
    keywords: ['subtitle', 'h2'],
    label: getContent('editor.h2'),
    value: 'h2',
  },
  {
    icon: <Heading3Icon />,
    keywords: ['subtitle', 'h3'],
    label: getContent('editor.h3'),
    value: 'h3',
  },
  {
    icon: <QuoteIcon />,
    keywords: ['citation', 'blockquote', '>'],
    label: getContent('editor.quote'),
    value: KEYS.blockquote,
  },
  {
    icon: <FileCodeIcon />,
    keywords: ['```'],
    label: getContent('editor.codeblock'),
    value: KEYS.codeBlock,
  },
  {
    icon: <ListIcon />,
    keywords: ['unordered', 'ul', '-'],
    label: getContent('editor.list.unordered'),
    value: KEYS.ul,
  },
  {
    icon: <ListOrderedIcon />,
    keywords: ['ordered', 'ol', '1'],
    label: getContent('editor.list.ordered'),
    value: KEYS.ol,
  },
  {
    icon: <ListTodoIcon />,
    keywords: ['checklist', 'task', 'checkbox', '[]'],
    label: getContent('editor.list.todo'),
    value: KEYS.listTodo,
  },
  {
    icon: <ListCollapseIcon />,
    keywords: ['collapsible', 'expandable'],
    label: getContent('editor.list.toggle'),
    value: KEYS.toggle,
  },
  {
    icon: <Columns3Icon />,
    label: getContent('editor.columns'),
    value: KEYS.columnGroup,
  },
]

export function TurnIntoToolbarButton(props: DropdownMenuProps) {
  const editor = useEditorRef()
  const [open, setOpen] = React.useState(false)

  const value = useSelectionFragmentProp({
    defaultValue: KEYS.p,
    getProp: (node) => getBlockType(node as TElement),
  })
  const selectedItem = React.useMemo(
    () => turnIntoItems.find((item) => item.value === (value ?? KEYS.p)) ?? turnIntoItems[0],
    [value],
  )

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton
          className="min-w-[125px] font-light"
          pressed={open}
          tooltip={getContent('editor.turninto')}
          isDropdown
        >
          {selectedItem.label}
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="ignore-click-outside/toolbar min-w-0"
        onCloseAutoFocus={(e) => {
          e.preventDefault()
          editor.tf.focus()
        }}
        align="start"
      >
        <ToolbarMenuGroup
          value={value}
          onValueChange={(type) => {
            setBlockType(editor, type)
          }}
          label={getContent('editor.turninto')}
        >
          {turnIntoItems.map(({ icon, label, value: itemValue }) => (
            <DropdownMenuRadioItem
              key={itemValue}
              className="min-w-[180px] pl-2 *:first:[span]:hidden"
              value={itemValue}
            >
              <span className="pointer-events-none absolute right-2 flex size-3.5 items-center justify-center">
                <DropdownMenuItemIndicator>
                  <CheckIcon />
                </DropdownMenuItemIndicator>
              </span>
              {icon}
              {label}
            </DropdownMenuRadioItem>
          ))}
        </ToolbarMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
