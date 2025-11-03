import { getContent } from '@/i18n'
import { TextEditor } from './TextEditor'

export const Write = () => {
  const initialValue = [
    {
      type: 'h2',
      children: [{ text: getContent('story.title') }],
    },
    {
      type: 'p',
      children: [
        { text: getContent('story.author'), italic: true, fontSize: '12px', color: 'gray' },
        { text: ' ' },
        { text: getContent('story.createtime'), italic: true, fontSize: '12px', color: 'gray' },
      ],
    },
    {
      type: 'p',
      children: [{ text: getContent('story.paragraph1') }],
    },
    {
      type: 'p',
      children: [{ text: getContent('story.paragraph2') }],
    },
    {
      type: 'p',
      children: [{ text: getContent('story.paragraph3') }],
    },
    {
      type: 'p',
      children: [{ text: getContent('story.paragraph4') }],
    },
    {
      type: 'p',
      children: [{ text: getContent('story.paragraph5') }],
    },
    {
      type: 'p',
      children: [{ text: getContent('story.paragraph6') }],
    },
    {
      type: 'p',
      children: [{ text: getContent('story.paragraph7') }],
    },
    {
      type: 'p',
      children: [{ text: getContent('story.paragraph8') }],
    },
    {
      type: 'p',
      children: [{ text: getContent('story.paragraph9') }],
    },
    {
      type: 'p',
      children: [{ text: getContent('story.paragraph10') }],
    },
    {
      type: 'p',
      children: [{ text: getContent('story.paragraph11') }],
    },
  ]

  return (
    <div className="mx-5">
      <TextEditor placeholder={getContent('editor.placeholder')} initialValue={initialValue} />
    </div>
  )
}
