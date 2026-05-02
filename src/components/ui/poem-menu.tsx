import { Link } from '@tanstack/react-router'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useTheme } from '@/components/ui/theme-provider'
import { getContent } from '@/i18n'

export function PoemMenu() {
  const [open, setOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  return (
    <div className="poem-menu" ref={menuRef}>
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
