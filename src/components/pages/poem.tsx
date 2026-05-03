import { Footer } from '@/components/footer'
import { getContent } from '@/i18n'
import '@/components/pages/poem.css'
import { SunMoon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/components/ui/theme-provider'

export const Poem = () => {
  const { theme, setTheme } = useTheme()
  const paragraphs = Array.from({ length: 4 }, (_, i) => {
    const key = `poem.paragraph${i + 1}`
    return <p key={key}>{getContent(key)}</p>
  })

  return (
    <div className="poem animated-bg">
      <div className="poem__theme-toggle">
        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          <SunMoon className="scale-100 rotate-0 transition-all dark:-rotate-180" />
        </Button>
      </div>
      <div className="poem__content">
        <h1>{getContent('poem.title')}</h1>
        {paragraphs}
        <Footer />
      </div>
    </div>
  )
}
