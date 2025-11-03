'use client'

import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu'
import {
  CalendarIcon,
  Columns3Icon,
  FileCodeIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Lightbulb,
  Link,
  ListCollapseIcon,
  ListIcon,
  ListOrderedIcon,
  ListTodoIcon,
  MinusIcon,
  PenToolIcon,
  PilcrowIcon,
  PlusIcon,
  QuoteIcon,
  RadicalIcon,
  TableIcon,
  TableOfContentsIcon,
} from 'lucide-react'
import { KEYS } from 'platejs'
import { type PlateEditor, useEditorRef } from 'platejs/react'
import * as React from 'react'
import { insertBlock, insertInlineElement } from '@/components/editor/transforms'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { getContent } from '@/i18n'
import { ToolbarButton, ToolbarMenuGroup } from './toolbar'

type Group = {
  group: string
  items: Item[]
}

interface Item {
  icon: React.ReactNode
  value: string
  onSelect: (editor: PlateEditor, value: string) => void
  focusEditor?: boolean
  label?: string
}

const groups: Group[] = [
  {
    group: getContent('editor.type.blocks'),
    items: [
      {
        icon: <PilcrowIcon />,
        label: getContent('editor.paragraph'),
        value: KEYS.p,
      },
      {
        icon: <Heading1Icon />,
        label: getContent('editor.h1'),
        value: 'h1',
      },
      {
        icon: <Heading2Icon />,
        label: getContent('editor.h2'),
        value: 'h2',
      },
      {
        icon: <Heading3Icon />,
        label: getContent('editor.h3'),
        value: 'h3',
      },
      {
        icon: <QuoteIcon />,
        label: getContent('editor.quote'),
        value: KEYS.blockquote,
      },
      {
        icon: <Lightbulb />,
        label: getContent('editor.callout'),
        value: KEYS.callout,
      },
      {
        icon: <TableIcon />,
        label: getContent('editor.table'),
        value: KEYS.table,
      },
      {
        icon: <FileCodeIcon />,
        label: getContent('editor.codeblock'),
        value: KEYS.codeBlock,
      },
      {
        icon: <MinusIcon />,
        label: getContent('editor.divider'),
        value: KEYS.hr,
      },
    ].map((item) => ({
      ...item,
      onSelect: (editor, value) => {
        insertBlock(editor, value)
      },
    })),
  },

  {
    group: getContent('editor.type.lists'),
    items: [
      {
        icon: <ListIcon />,
        label: getContent('editor.list.unordered'),
        value: KEYS.ul,
      },
      {
        icon: <ListOrderedIcon />,
        label: getContent('editor.list.ordered'),
        value: KEYS.ol,
      },
      {
        icon: <ListTodoIcon />,
        label: getContent('editor.list.todo'),
        value: KEYS.listTodo,
      },
      {
        icon: <ListCollapseIcon />,
        label: getContent('editor.list.toggle'),
        value: KEYS.toggle,
      },
    ].map((item) => ({
      ...item,
      onSelect: (editor, value) => {
        insertBlock(editor, value)
      },
    })),
  },

  {
    group: getContent('editor.type.advancedblocks'),
    items: [
      {
        icon: <TableOfContentsIcon />,
        label: getContent('editor.toc'),
        value: KEYS.toc,
      },
      {
        icon: <Columns3Icon />,
        label: getContent('editor.columns'),
        value: KEYS.columnGroup,
      },
      {
        focusEditor: false,
        icon: <RadicalIcon />,
        label: getContent('editor.equation'),
        value: KEYS.equation,
      },
      {
        icon: <PenToolIcon />,
        label: getContent('editor.excalidraw'),
        value: KEYS.excalidraw,
      },
    ].map((item) => ({
      ...item,
      onSelect: (editor, value) => {
        insertBlock(editor, value)
      },
    })),
  },
  {
    group: getContent('editor.type.inline'),
    items: [
      {
        focusEditor: true,
        icon: <CalendarIcon />,
        label: getContent('editor.date'),
        value: KEYS.date,
      },
      {
        icon: <Link />,
        label: getContent('editor.link'),
        value: KEYS.link,
      },
      {
        focusEditor: false,
        icon: <RadicalIcon />,
        label: getContent('editor.inlineequation'),
        value: KEYS.inlineEquation,
      },
    ].map((item) => ({
      ...item,
      onSelect: (editor, value) => {
        insertInlineElement(editor, value)
      },
    })),
  },
]

export function InsertToolbarButton(props: DropdownMenuProps) {
  const editor = useEditorRef()
  const [open, setOpen] = React.useState(false)
  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton pressed={open} tooltip={getContent('editor.insert')} isDropdown>
          <PlusIcon />
        </ToolbarButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex max-h-[500px] min-w-0 flex-col overflow-y-auto" align="start">
        {groups.map(({ group, items: nestedItems }) => (
          <ToolbarMenuGroup key={group} label={group}>
            {nestedItems.map(({ icon, label, value, onSelect }) => (
              <DropdownMenuItem
                key={value}
                className="min-w-[180px]"
                onSelect={() => {
                  onSelect(editor, value)
                  editor.tf.focus()
                }}
              >
                {icon}
                {label}
              </DropdownMenuItem>
            ))}
          </ToolbarMenuGroup>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
