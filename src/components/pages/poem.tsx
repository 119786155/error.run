import { Footer } from '@/components/footer'
import { getContent } from '@/i18n'
import '@/components/pages/poem.css'

export const Poem = () => {
  const dots = []
  for (let i = 0; i < 50; i++) {
    dots.push(<span key={i}></span>)
  }

  const paragraphs = []
  for (let i = 1; i < 5; i++) {
    paragraphs.push(
      <p key={i} className="leading-3">
        {getContent(`poem.paragraph${i}`)}
      </p>,
    )
  }

  return (
    <div className="background">
      {dots}
      <h1>{getContent('poem.title')}</h1>
      {paragraphs}
      <Footer />
    </div>
  )
}
