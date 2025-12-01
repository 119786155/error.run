import { useTour } from '@reactour/tour'
import { CircleQuestionMark } from 'lucide-react'
import { ToolbarButton } from '@/components/ui/toolbar'
import { getContent } from '@/i18n'

export function TutorialToolbarButton() {
  const { setIsOpen } = useTour()

  return (
    <ToolbarButton onClick={() => setIsOpen(true)} tooltip={getContent('editor.tutorial')}>
      <CircleQuestionMark />
    </ToolbarButton>
  )
}
