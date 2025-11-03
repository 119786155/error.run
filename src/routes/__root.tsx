import { createRootRoute, HeadContent, Outlet } from '@tanstack/react-router'
import { useEffect } from 'react'
import { ThemeProvider } from '@/components/ui/theme-provider'

const RootLayout = () => {
  useEffect(() => {
    const beforeRenderElement = document.getElementById('beforeRender') as HTMLElement

    if (beforeRenderElement) beforeRenderElement.remove()
  }, [])

  return (
    <ThemeProvider storageKey="theme">
      <HeadContent />
      <Outlet />
    </ThemeProvider>
  )
}

export const Route = createRootRoute({ component: RootLayout })
