import { Footer } from '@/components/footer'
import { PoemMenu } from '@/components/ui/poem-menu'
import { getContent } from '@/i18n'
import '@/components/pages/poem.css'

export const Poem = () => {
  const paragraphs = Array.from({ length: 4 }, (_, i) => {
    const key = `poem.paragraph${i + 1}`
    return <p key={key}>{getContent(key)}</p>
  })

  return (
    <div className="poem">
      <PoemMenu />
      <div className="poem__content">
        <h1>{getContent('poem.title')}</h1>
        {paragraphs}
        <Footer />
      </div>
    </div>
  )
}
