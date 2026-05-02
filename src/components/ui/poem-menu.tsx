import { Link } from '@tanstack/react-router'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { useState } from 'react'
import { useTheme } from '@/components/ui/theme-provider'
import { getContent } from '@/i18n'

export function PoemMenu() {
  const [open, setOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  return (
    <div className="poem-menu">
      <button type="button" className="poem-menu__toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu">
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
      {open && (
        <nav className="poem-menu__nav">
          <button type="button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            <span>{getContent(`app.theme.${theme === 'dark' ? 'light' : 'dark'}`)}</span>
          </button>
          <Link to="/write">Write</Link>
          <Link to="/room">Room</Link>
          <Link to="/jump">Jump</Link>
        </nav>
      )}
    </div>
  )
}
