import { createFileRoute } from '@tanstack/react-router'
import { Draw } from '@/components/Draw'
import { getContent } from '@/i18n'

export const Route = createFileRoute('/draw')({
  component: Draw,
  head: () => {
    return {
      meta: [
        { title: getContent('app.pages.draw.title') },
        { content: getContent('app.pages.draw.desc'), name: 'description' },
      ],
    }
  },
})
