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
import { AlignToolbarButton } from '@/components/ui/align-toolbar-button'
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

const Separator = () => <ToolbarSeparator className="h-[20px]" />

export const FixedToolbarButtons = () => {
  return (
    <>
      <ModeToolbarButton />

      <Separator />

      <UndoToolbarButton />

      <RedoToolbarButton />

      <Separator />

      <ExportToolbarButton />

      <ImportToolbarButton />

      <Separator />

      <InsertToolbarButton />

      <TurnIntoToolbarButton />

      <FontSizeToolbarButton />

      <Separator />

      <MarkToolbarButton nodeType="bold" tooltip={getContent('editor.bold')}>
        <Bold />
      </MarkToolbarButton>

      <MarkToolbarButton nodeType="italic" tooltip={getContent('editor.italic')}>
        <Italic />
      </MarkToolbarButton>

      <MarkToolbarButton nodeType="underline" tooltip={getContent('editor.underline')}>
        <Underline />
      </MarkToolbarButton>

      <MarkToolbarButton nodeType="strikethrough" tooltip={getContent('editor.strikethrough')}>
        <Strikethrough />
      </MarkToolbarButton>

      <MarkToolbarButton nodeType="code" tooltip={getContent('editor.code')}>
        <Code />
      </MarkToolbarButton>

      <MarkToolbarButton nodeType="kbd" tooltip={getContent('editor.kbd')}>
        <Keyboard />
      </MarkToolbarButton>

      <MarkToolbarButton nodeType="superscript" tooltip={getContent('editor.superscript')}>
        <Superscript />
      </MarkToolbarButton>

      <MarkToolbarButton nodeType="subscript" tooltip={getContent('editor.subscript')}>
        <Subscript />
      </MarkToolbarButton>

      <FontColorToolbarButton nodeType="color" tooltip={getContent('editor.txtcolor')}>
        <Baseline />
      </FontColorToolbarButton>

      <FontColorToolbarButton nodeType="backgroundColor" tooltip={getContent('editor.bgcolor')}>
        <PaintBucket />
      </FontColorToolbarButton>

      <EmojiToolbarButton />

      <Separator />

      <MediaToolbarButton nodeType={KEYS.audio} />

      {/* <MediaToolbarButton nodeType={KEYS.file} /> */}

      <MediaToolbarButton nodeType={KEYS.img} />

      <MediaToolbarButton nodeType={KEYS.video} />

      <Separator />

      <LineHeightToolbarButton />

      <AlignToolbarButton />

      <IndentToolbarButton />

      <OutdentToolbarButton />

      <Separator />

      <ThemeToggle />
    </>
  )
}
