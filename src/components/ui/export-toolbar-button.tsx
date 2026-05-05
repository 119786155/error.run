'use client'

import { MarkdownPlugin } from '@platejs/markdown'
import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu'
import dayjs from 'dayjs'
import { ArrowDownToLineIcon } from 'lucide-react'
import { createSlateEditor } from 'platejs'
import { useEditorRef } from 'platejs/react'
import { serializeHtml } from 'platejs/static'
import * as React from 'react'
import { getEditorKit } from '@/components/editor/plugins'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { getContent } from '@/i18n'
import { EditorStatic } from './editor-static'
import { ToolbarButton } from './toolbar'

const siteUrl = 'https://platejs.org'

export function ExportToolbarButton(props: DropdownMenuProps) {
  const editor = useEditorRef()
  const [open, setOpen] = React.useState(false)

  const getName = (suffix: string) => `${dayjs().format('YYYY-MM-DD')}.${suffix}`

  const downloadFile = async (url: string, filename: string) => {
    const response = await fetch(url)

    const blob = await response.blob()
    const blobUrl = window.URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = blobUrl
    link.download = filename
    document.body.append(link)
    link.click()
    link.remove()

    // Clean up the blob URL
    window.URL.revokeObjectURL(blobUrl)
  }

  const exportToMarkDown = async () => {
    const md = editor.getApi(MarkdownPlugin).markdown.serialize()
    const url = `data:text/markdown;charset=utf-8,${encodeURIComponent(md)}`
    await downloadFile(url, getName('md'))
  }

  const exportToJson = async () => {
    const json = ((editor.value as Record<string, string>[]) || []).map(({ id, ...items }) => items)
    const str = JSON.stringify(json, null, ' ')
    const url = `data:text/json;charset=utf-8,${encodeURIComponent(str)}`
    await downloadFile(url, getName('json'))
  }

  const exportToHtml = async () => {
    const editorStatic = createSlateEditor({
      plugins: getEditorKit(),
      value: editor.children,
    })

    const editorHtml = await serializeHtml(editorStatic, {
      editorComponent: EditorStatic,
      props: { style: { padding: '0 calc(50% - 350px)', paddingBottom: '' } },
    })

    const tailwindCss = `<link rel="stylesheet" href="${siteUrl}/tailwind.css">`
    const katexCss = `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.18/dist/katex.css" integrity="sha384-9PvLvaiSKCPkFKB1ZsEoTjgnJn+O3KvEwtsz37/XrkYft3DTk2gHdYvd9oWgW3tV" crossorigin="anonymous">`

    const html = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="color-scheme" content="light dark" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400..700&family=JetBrains+Mono:wght@400..700&display=swap"
          rel="stylesheet"
        />
        ${tailwindCss}
        ${katexCss}
        <style>
          :root {
            --font-sans: 'Inter', 'Inter Fallback';
            --font-mono: 'JetBrains Mono', 'JetBrains Mono Fallback';
          }
        </style>
      </head>
      <body>
        ${editorHtml}
      </body>
    </html>`

    const url = `data:text/html;charset=utf-8,${encodeURIComponent(html)}`

    await downloadFile(url, getName('html'))
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton pressed={open} tooltip={getContent('editor.export')} isDropdown>
          <ArrowDownToLineIcon className="size-4" />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={exportToHtml}>{getContent('editor.exportFile.html')}</DropdownMenuItem>
          <DropdownMenuItem onSelect={exportToMarkDown}>{getContent('editor.exportFile.md')}</DropdownMenuItem>
          <DropdownMenuItem onSelect={exportToJson}>{getContent('editor.exportFile.json')}</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
