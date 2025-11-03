'use client'

import {
  CalendarIcon,
  Columns3Icon,
  FileCodeIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Keyboard,
  Lightbulb,
  ListCollapseIcon,
  ListIcon,
  ListOrderedIcon,
  ListTodoIcon,
  PenToolIcon,
  PilcrowIcon,
  QuoteIcon,
  RadicalIcon,
  Subscript,
  Superscript,
  TableIcon,
  TableOfContentsIcon,
} from 'lucide-react'
import { KEYS, type TComboboxInputElement } from 'platejs'
import type { PlateEditor, PlateElementProps } from 'platejs/react'
import { PlateElement } from 'platejs/react'
import type * as React from 'react'
import { insertBlock, insertInlineElement } from '@/components/editor/transforms'
import { getContent } from '@/i18n'
import {
  InlineCombobox,
  InlineComboboxContent,
  InlineComboboxEmpty,
  InlineComboboxGroup,
  InlineComboboxGroupLabel,
  InlineComboboxInput,
  InlineComboboxItem,
} from './inline-combobox'

type Group = {
  group: string
  items: {
    icon: React.ReactNode
    value: string
    onSelect: (editor: PlateEditor, value: string) => void
    className?: string
    focusEditor?: boolean
    keywords?: string[]
    label?: string
  }[]
}

const groups: Group[] = [
  {
    group: getContent('editor.type.blocks'),
    items: [
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
        value: KEYS.h1,
      },
      {
        icon: <Heading2Icon />,
        keywords: ['subtitle', 'h2'],
        label: getContent('editor.h2'),
        value: KEYS.h2,
      },
      {
        icon: <Heading3Icon />,
        keywords: ['subtitle', 'h3'],
        label: getContent('editor.h3'),
        value: KEYS.h3,
      },
      {
        icon: <QuoteIcon />,
        keywords: ['citation', 'blockquote', 'quote', '>'],
        label: getContent('editor.quote'),
        value: KEYS.blockquote,
      },
      {
        icon: <Lightbulb />,
        keywords: ['note'],
        label: getContent('editor.callout'),
        value: KEYS.callout,
      },
      {
        icon: <FileCodeIcon />,
        keywords: ['```'],
        label: getContent('editor.codeblock'),
        value: KEYS.codeBlock,
      },
      {
        icon: <TableIcon />,
        label: getContent('editor.table'),
        value: KEYS.table,
      },
    ].map((item) => ({
      ...item,
      onSelect: (editor, value) => {
        insertBlock(editor, value, { upsert: true })
      },
    })),
  },
  {
    group: getContent('editor.type.lists'),
    items: [
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
    ].map((item) => ({
      ...item,
      onSelect: (editor, value) => {
        insertBlock(editor, value, { upsert: true })
      },
    })),
  },
  {
    group: getContent('editor.type.advancedblocks'),
    items: [
      {
        icon: <TableOfContentsIcon />,
        keywords: ['toc'],
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
        keywords: ['excalidraw'],
        label: getContent('editor.excalidraw'),
        value: KEYS.excalidraw,
      },
    ].map((item) => ({
      ...item,
      onSelect: (editor, value) => {
        insertBlock(editor, value, { upsert: true })
      },
    })),
  },
  {
    group: getContent('editor.type.inline'),
    items: [
      {
        focusEditor: true,
        icon: <CalendarIcon />,
        keywords: ['time'],
        label: getContent('editor.date'),
        value: KEYS.date,
      },
      {
        icon: <Keyboard />,
        label: getContent('editor.kbd'),
        value: KEYS.kbd,
      },
      {
        icon: <Superscript />,
        label: getContent('editor.superscript'),
        value: KEYS.sup,
      },
      {
        icon: <Subscript />,
        label: getContent('editor.subscript'),
        value: KEYS.sub,
      },
    ].map((item) => ({
      ...item,
      onSelect: (editor, value) => {
        insertInlineElement(editor, value)
      },
    })),
  },
]

export function SlashInputElement(props: PlateElementProps<TComboboxInputElement>) {
  const { editor, element } = props

  return (
    <PlateElement {...props} as="span">
      <InlineCombobox element={element} trigger="/">
        <InlineComboboxInput />

        <InlineComboboxContent>
          <InlineComboboxEmpty>No results</InlineComboboxEmpty>

          {groups.map(({ group, items }) => (
            <InlineComboboxGroup key={group}>
              <InlineComboboxGroupLabel>{group}</InlineComboboxGroupLabel>

              {items.map(({ focusEditor, icon, keywords, label, value, onSelect }) => (
                <InlineComboboxItem
                  key={value}
                  value={value}
                  onClick={() => onSelect(editor, value)}
                  label={label}
                  focusEditor={focusEditor}
                  group={group}
                  keywords={keywords}
                >
                  <div className="mr-2 text-muted-foreground">{icon}</div>
                  {label ?? value}
                </InlineComboboxItem>
              ))}
            </InlineComboboxGroup>
          ))}
        </InlineComboboxContent>
      </InlineCombobox>

      {props.children}
    </PlateElement>
  )
}
