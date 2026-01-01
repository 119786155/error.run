import { createFileRoute } from '@tanstack/react-router'
import { AI } from '@/components/pages/ai'
import { getContent } from '@/i18n'

export const Route = createFileRoute('/ai')({
  component: AI,
  head: () => {
    return {
      meta: [
        { title: getContent('app.pages.ai.title') },
        { content: getContent('app.pages.ai.desc'), name: 'description' },
      ],
    }
  },
})
