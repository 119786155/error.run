import { createFileRoute } from '@tanstack/react-router'
import { Poem } from '@/components/pages/poem'
import { getContent } from '@/i18n'

export const Route = createFileRoute('/')({
  component: Poem,
  head: () => {
    return {
      meta: [{ title: getContent('app.title') }, { content: getContent('app.desc'), name: 'description' }],
    }
  },
})
