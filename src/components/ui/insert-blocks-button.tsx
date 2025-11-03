'use client'
import { insertCallout } from '@platejs/callout'
import { insertCodeBlock } from '@platejs/code-block'
import { TablePlugin } from '@platejs/table/react'
import {
  CodeXml,
  FileCode,
  Highlighter,
  Keyboard,
  Lightbulb,
  Plus,
  Strikethrough,
  Subscript,
  Superscript,
  Table,
  TextQuote,
  Underline,
} from 'lucide-react'
import type { PlateEditor } from 'platejs/react'
import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MarkToolbarButton } from '@/components/ui/mark-toolbar-button'
import { ToolbarButton } from '@/components/ui/toolbar'
import { getContent } from '@/i18n'

export function InsertBlocksButton(props: { editor: PlateEditor; toggle: (type: string) => void }) {
  const [open, setOpen] = useState(false)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton tooltip={getContent('editor.insert')} isDropdown pressed={open}>
          <Plus />
        </ToolbarButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="text-xs text-gray-500">{getContent('editor.type.blocks')}</DropdownMenuLabel>
        <DropdownMenuItem>
          <ToolbarButton onClick={() => props.toggle('h1')}>H1 {getContent('editor.h1')}</ToolbarButton>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ToolbarButton onClick={() => props.toggle('h1')}>H2 {getContent('editor.h2')}</ToolbarButton>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ToolbarButton onClick={() => props.toggle('h3')}>H3 {getContent('editor.h3')}</ToolbarButton>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ToolbarButton onClick={() => props.toggle('blockquote')}>
            <TextQuote /> {getContent('editor.quote')}
          </ToolbarButton>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ToolbarButton onClick={() => insertCallout(props.editor, { select: true })}>
            <Lightbulb /> {getContent('editor.callout')}
          </ToolbarButton>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ToolbarButton onClick={() => props.editor.getTransforms(TablePlugin).insert.table({}, { select: true })}>
            <Table /> {getContent('editor.table')}
          </ToolbarButton>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ToolbarButton onClick={() => insertCodeBlock(props.editor, { select: true })}>
            <FileCode /> {getContent('editor.codeblock')}
          </ToolbarButton>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-xs text-gray-500">{getContent('editor.type.inline')}</DropdownMenuLabel>
        <DropdownMenuItem>
          <MarkToolbarButton nodeType="underline">
            <Underline /> {getContent('editor.underline')}
          </MarkToolbarButton>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <MarkToolbarButton nodeType="strikethrough">
            <Strikethrough /> {getContent('editor.strikethrough')}
          </MarkToolbarButton>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <MarkToolbarButton nodeType="highlight">
            <Highlighter /> {getContent('editor.highlight')}
          </MarkToolbarButton>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <MarkToolbarButton nodeType="code">
            <CodeXml /> {getContent('editor.code')}
          </MarkToolbarButton>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <MarkToolbarButton nodeType="kbd">
            <Keyboard /> {getContent('editor.kbd')}
          </MarkToolbarButton>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <MarkToolbarButton nodeType="superscript">
            <Superscript /> {getContent('editor.superscript')}
          </MarkToolbarButton>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <MarkToolbarButton nodeType="subscript">
            <Subscript /> {getContent('editor.subscript')}
          </MarkToolbarButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
