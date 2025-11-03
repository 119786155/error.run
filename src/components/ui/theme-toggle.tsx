import { SunMoon } from 'lucide-react'
import { useTheme } from '@/components/ui/theme-provider'
import { ToolbarButton } from '@/components/ui/toolbar'
import { getContent } from '@/i18n'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  return (
    <ToolbarButton onClick={toggleTheme} tooltip={getContent(`app.theme.${theme}`)}>
      <SunMoon className="scale-100 rotate-0 transition-all dark:-rotate-180" />
    </ToolbarButton>
  )
}
