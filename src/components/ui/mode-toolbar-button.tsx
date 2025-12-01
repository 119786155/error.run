import { Pencil, PencilOff } from 'lucide-react'
import { usePlateState } from 'platejs/react'
import { ToolbarButton } from '@/components/ui/toolbar'
import { getContent } from '@/i18n'

export function ModeToolbarButton() {
  const [readOnly, setReadOnly] = usePlateState('readOnly')

  return (
    <ToolbarButton
      id="step-2"
      onClick={() => setReadOnly(!readOnly)}
      tooltip={readOnly ? getContent('editor.mode.viewing') : getContent('editor.mode.editing')}
    >
      {readOnly ? <PencilOff /> : <Pencil />}
    </ToolbarButton>
  )
}
