import { getContent } from '@/i18n'

export const Story = () => {
  return (
    <div className="w-66 md:w-88 lg:w-188 mx-auto my-5 leading-[250%]">
      <p className="text-lg font-bold">{getContent('story.title')}</p>
      <p className="text-xs italic text-gray-700 dark:text-gray-400 leading-[300%]">
        {getContent('story.author')} {getContent('story.createtime')}
      </p>
      <p>{getContent('story.paragraph1')}</p>
      <p>{getContent('story.paragraph2')}</p>
      <p>{getContent('story.paragraph3')}</p>
      <p>{getContent('story.paragraph4')}</p>
      <p>{getContent('story.paragraph5')}</p>
      <p>{getContent('story.paragraph6')}</p>
      <p>{getContent('story.paragraph7')}</p>
      <p>{getContent('story.paragraph8')}</p>
      <p>{getContent('story.paragraph9')}</p>
      <p>{getContent('story.paragraph10')}</p>
      <p>{getContent('story.paragraph11')}</p>
    </div>
  )
}
