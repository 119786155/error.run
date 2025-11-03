import { SunMoon } from 'lucide-react'
import { useTheme } from '@/components/ThemeProvider'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  return (
    <Button onClick={toggleTheme} variant="ghost" className="cursor-pointer">
      <SunMoon className="scale-100 rotate-0 transition-all dark:-rotate-180" />
    </Button>
  )
}
