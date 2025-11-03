import { Pencil, PencilOff } from 'lucide-react'
import { ToolbarButton } from '@/components/ui/toolbar'
import { getContent } from '@/i18n'

type Props = {
  readOnly: boolean
  setReadOnly: (val: boolean) => void
}

export function ModeToolbarButton({ readOnly, setReadOnly }: Props) {
  return (
    <ToolbarButton
      onClick={() => setReadOnly(!readOnly)}
      tooltip={readOnly ? getContent('editor.mode.viewing') : getContent('editor.mode.editing')}
    >
      {readOnly ? <PencilOff /> : <Pencil />}
    </ToolbarButton>
  )
}
