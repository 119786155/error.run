import { Footer } from '@/components/footer'
import { getContent } from '@/i18n'
import type { ParticleConfig } from './poem-config'
import { defaultConfig } from './poem-config'
import '@/components/pages/poem.css'

export const Poem = () => {
  const config: ParticleConfig = defaultConfig

  const dots = Array.from({ length: config.count }, (_, i) => {
    const size = config.minSize + Math.random() * (config.maxSize - config.minSize)
    const color = config.colors[Math.floor(Math.random() * config.colors.length)]
    const duration = config.minDuration + Math.random() * (config.maxDuration - config.minDuration)
    const delay = config.minDelay + Math.random() * (config.maxDelay - config.minDelay)
    const top = Math.random() * 100
    const left = Math.random() * 100
    const transformOriginX = `${Math.random() * 30 - 15}vw`
    const transformOriginY = `${Math.random() * 30 - 15}vh`
    const shadowSize = 0.3 + Math.random() * 0.9
    const id = `${i}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    return (
      <span
        key={id}
        style={{
          width: `${size}vmin`,
          height: `${size}vmin`,
          borderRadius: `${size}vmin`,
          color,
          top: `${top}%`,
          left: `${left}%`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
          transformOrigin: `${transformOriginX} ${transformOriginY}`,
          boxShadow: `2vmin 0 ${shadowSize}vmin currentColor`,
        }}
      />
    )
  })

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
      <div className="poem-container">
        <h1>{getContent('poem.title')}</h1>
        {paragraphs}
        <Footer />
      </div>
    </div>
  )
}
