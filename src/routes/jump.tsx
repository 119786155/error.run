import { createFileRoute } from '@tanstack/react-router'
import { Jump } from '@/components/pages/jump/jump'
import { getContent } from '@/i18n'

export const Route = createFileRoute('/jump')({
  component: Jump,
  head: () => {
    return {
      meta: [
        { title: getContent('app.pages.jump.title') },
        { content: getContent('app.pages.jump.desc'), name: 'description' },
      ],
    }
  },
})
