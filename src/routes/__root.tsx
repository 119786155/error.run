import { createRootRoute, HeadContent, Outlet } from '@tanstack/react-router'
import { useEffect } from 'react'
import { ThemeProvider } from '@/components/ThemeProvider'
import { ThemeToggle } from '@/components/ThemeToggle'

const RootLayout = () => {
  useEffect(() => {
    const beforeRenderElement = document.getElementById('beforeRender') as HTMLElement

    if (beforeRenderElement) beforeRenderElement.remove()
  }, [])

  return (
    <ThemeProvider storageKey="theme">
      <HeadContent />
      <Outlet />
      <ThemeToggle />
    </ThemeProvider>
  )
}

export const Route = createRootRoute({ component: RootLayout })
