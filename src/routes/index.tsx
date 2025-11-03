import { createFileRoute } from '@tanstack/react-router'
import { Story } from '@/components/pages/story'
import { getContent } from '@/i18n'

export const Route = createFileRoute('/')({
  component: Story,
  head: () => {
    return {
      meta: [{ title: getContent('app.title') }, { content: getContent('app.desc'), name: 'description' }],
    }
  },
})
