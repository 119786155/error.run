import { createFileRoute } from '@tanstack/react-router'
import { Write } from '@/components/Write'
import { getContent } from '@/i18n'

export const Route = createFileRoute('/')({
  component: Write,
  head: () => {
    return {
      meta: [
        { title: getContent('app.pages.write.title') },
        { content: getContent('app.pages.write.desc'), name: 'description' },
      ],
    }
  },
})
