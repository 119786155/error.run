import { Editor } from '@/components/editor'
import { getContent } from '@/i18n'

export const Story = () => {
  const staticValue = [
    {
      type: 'h1',
      children: [
        {
          text: getContent('story.title'),
        },
      ],
    },
    {
      type: 'p',
      children: [
        {
          text: `${getContent('story.author')} ${getContent('story.createtime')}`,
        },
      ],
      color: '#999999',
      fontSize: '14px',
      italic: true,
    },
    {
      type: 'p',
      children: [
        {
          text: getContent('story.paragraph1'),
        },
      ],
      lineHeight: 3,
    },
    {
      type: 'p',
      children: [
        {
          text: getContent('story.paragraph2'),
        },
      ],
      lineHeight: 3,
    },
    {
      type: 'p',
      children: [
        {
          text: getContent('story.paragraph3'),
        },
      ],
      lineHeight: 3,
    },
    {
      type: 'p',
      children: [
        {
          text: getContent('story.paragraph4'),
        },
      ],
      lineHeight: 3,
    },
    {
      type: 'p',
      children: [
        {
          text: getContent('story.paragraph5'),
        },
      ],
      lineHeight: 3,
    },
    {
      type: 'p',
      children: [
        {
          text: getContent('story.paragraph6'),
        },
      ],
      lineHeight: 3,
    },
    {
      type: 'p',
      children: [
        {
          text: getContent('story.paragraph7'),
        },
      ],
      lineHeight: 3,
    },
    {
      type: 'p',
      children: [
        {
          text: getContent('story.paragraph8'),
        },
      ],
      lineHeight: 3,
    },
    {
      type: 'p',
      children: [
        {
          text: getContent('story.paragraph9'),
        },
      ],
      lineHeight: 3,
    },
    {
      type: 'p',
      children: [
        {
          text: getContent('story.paragraph10'),
        },
      ],
      lineHeight: 3,
    },
    {
      type: 'p',
      children: [
        {
          text: getContent('story.paragraph11'),
        },
      ],
      lineHeight: 3,
    },
  ]
  return (
    <div className="mx-5 min-h-dvh">
      <Editor staticValue={staticValue} />
    </div>
  )
}
