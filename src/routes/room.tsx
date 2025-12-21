import { createFileRoute } from '@tanstack/react-router'
import { Room } from '@/components/pages/room'
import { getContent } from '@/i18n'

export const Route = createFileRoute('/room')({
  component: Room,
  head: () => {
    return {
      meta: [
        { title: getContent('app.pages.room.title') },
        { content: getContent('app.pages.room.desc'), name: 'description' },
      ],
    }
  },
})
