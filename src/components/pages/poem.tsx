import { Footer } from '@/components/footer'
import { getContent } from '@/i18n'
import '@/components/pages/poem.css'

export const Poem = () => {
  const paragraphs = []
  for (let i = 1; i < 5; i++) {
    paragraphs.push(<p key={i}>{getContent(`poem.paragraph${i}`)}</p>)
  }

  return (
    <div className="poem-page">
      <div className="poem-circles">
        <div className="poem-circle" />
        <div className="poem-circle" />
        <div className="poem-circle" />
      </div>
      <div className="poem-container">
        <h1>{getContent('poem.title')}</h1>
        {paragraphs}
        <Footer />
      </div>
    </div>
  )
}
