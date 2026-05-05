'use client'

import {
  Baseline,
  Bold,
  Code,
  Italic,
  Keyboard,
  PaintBucket,
  Strikethrough,
  Subscript,
  Superscript,
  Underline,
} from 'lucide-react'
import { KEYS } from 'platejs'

import { EmojiToolbarButton } from '@/components/ui/emoji-toolbar-button'
import { ExportToolbarButton } from '@/components/ui/export-toolbar-button'
import { FontColorToolbarButton } from '@/components/ui/font-color-toolbar-button'
import { FontSizeToolbarButton } from '@/components/ui/font-size-toolbar-button'
import { RedoToolbarButton, UndoToolbarButton } from '@/components/ui/history-toolbar-button'
import { ImportToolbarButton } from '@/components/ui/import-toolbar-button'
import { IndentToolbarButton, OutdentToolbarButton } from '@/components/ui/indent-toolbar-button'
import { InsertToolbarButton } from '@/components/ui/insert-toolbar-button'
import { LineHeightToolbarButton } from '@/components/ui/line-height-toolbar-button'
import { MarkToolbarButton } from '@/components/ui/mark-toolbar-button'
import { MediaToolbarButton } from '@/components/ui/media-toolbar-button'
import { ModeToolbarButton } from '@/components/ui/mode-toolbar-button'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { ToolbarSeparator } from '@/components/ui/toolbar'
import { TurnIntoToolbarButton } from '@/components/ui/turn-into-toolbar-button'
import { getContent } from '@/i18n'
import { cn } from '@/lib/utils'

const Separator = ({ className }: { className?: string }) => (
  <ToolbarSeparator className={cn('h-[20px] shrink-0', className)} />
)

export const FixedToolbarButtons = () => {
  return (
    <>
      <ThemeToggle data-testid="toolbar-theme-toggle" />

      <Separator />

      <ModeToolbarButton data-testid="toolbar-mode-toggle" />

      <Separator />

      <UndoToolbarButton data-testid="toolbar-undo" />

      <RedoToolbarButton data-testid="toolbar-redo" />

      <Separator />

      <ExportToolbarButton data-testid="toolbar-export" />

      <ImportToolbarButton data-testid="toolbar-import" />

      <Separator />

      <InsertToolbarButton data-testid="toolbar-insert" />

      <TurnIntoToolbarButton data-testid="toolbar-turn-into" />

      <FontSizeToolbarButton />

      <Separator />

      <MarkToolbarButton nodeType="bold" tooltip={getContent('editor.bold')} data-testid="toolbar-bold">
        <Bold />
      </MarkToolbarButton>

      <MarkToolbarButton nodeType="italic" tooltip={getContent('editor.italic')} data-testid="toolbar-italic">
        <Italic />
      </MarkToolbarButton>

      <MarkToolbarButton nodeType="underline" tooltip={getContent('editor.underline')} data-testid="toolbar-underline">
        <Underline />
      </MarkToolbarButton>

      <MarkToolbarButton
        nodeType="strikethrough"
        tooltip={getContent('editor.strikethrough')}
        data-testid="toolbar-strikethrough"
      >
        <Strikethrough />
      </MarkToolbarButton>

      <MarkToolbarButton nodeType="code" tooltip={getContent('editor.code')} data-testid="toolbar-code">
        <Code />
      </MarkToolbarButton>

      <MarkToolbarButton nodeType="kbd" tooltip={getContent('editor.kbd')} data-testid="toolbar-kbd">
        <Keyboard />
      </MarkToolbarButton>

      <MarkToolbarButton
        nodeType="superscript"
        tooltip={getContent('editor.superscript')}
        data-testid="toolbar-superscript"
      >
        <Superscript />
      </MarkToolbarButton>

      <MarkToolbarButton nodeType="subscript" tooltip={getContent('editor.subscript')} data-testid="toolbar-subscript">
        <Subscript />
      </MarkToolbarButton>

      <Separator />

      <FontColorToolbarButton nodeType="color" tooltip={getContent('editor.txtcolor')} data-testid="toolbar-font-color">
        <Baseline />
      </FontColorToolbarButton>

      <FontColorToolbarButton
        nodeType="backgroundColor"
        tooltip={getContent('editor.bgcolor')}
        data-testid="toolbar-bg-color"
      >
        <PaintBucket />
      </FontColorToolbarButton>

      <EmojiToolbarButton data-testid="toolbar-emoji" />

      <Separator />

      <MediaToolbarButton nodeType={KEYS.audio} data-testid="toolbar-media-audio" />

      <MediaToolbarButton nodeType={KEYS.img} data-testid="toolbar-media-image" />

      <MediaToolbarButton nodeType={KEYS.video} data-testid="toolbar-media-video" />

      <Separator />

      <LineHeightToolbarButton data-testid="toolbar-line-height" />

      <IndentToolbarButton data-testid="toolbar-indent" />

      <OutdentToolbarButton data-testid="toolbar-outdent" />
    </>
  )
}
