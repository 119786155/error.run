import { createFileRoute } from '@tanstack/react-router'
import { Story } from '@/components/pages/games/story/story'
import { getContent } from '@/i18n'

export const Route = createFileRoute('/story')({
  component: Story,
  head: () => {
    return {
      meta: [
        { title: getContent('app.pages.story.title') },
        { content: getContent('app.pages.story.desc'), name: 'description' },
      ],
    }
  },
})
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/story')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/story"!</div>
}
