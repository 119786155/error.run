import { createContext, useCallback, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: 'light',
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({ children, defaultTheme = 'light', ...props }: ThemeProviderProps) {
  const getCurrentTheme = () => (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')

  const [theme, setTheme] = useState<Theme>(getCurrentTheme())

  const updateTheme = useCallback(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')

    root.classList.add(theme)
  }, [theme])

  let hasListener = false

  useEffect(() => {
    updateTheme()

    if (!hasListener) {
      hasListener = true

      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        updateTheme()
      })
    }
  }, [updateTheme, hasListener])

  const value = {
    theme,
    setTheme,
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) throw new Error('useTheme must be used within a ThemeProvider')

  return context
}
