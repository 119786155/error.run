import { createRootRoute, HeadContent, Outlet } from '@tanstack/react-router'
import { useEffect } from 'react'
import { Header } from '@/components/Header'
import { ThemeProvider } from '@/components/ThemeProvider'

const RootLayout = () => {
  useEffect(() => {
    const beforeRenderElement = document.getElementById('beforeRender') as HTMLElement

    if (beforeRenderElement) beforeRenderElement.remove()
  }, [])

  return (
    <ThemeProvider storageKey="theme">
      <HeadContent />
      <Header />
      <Outlet />
    </ThemeProvider>
  )
}

export const Route = createRootRoute({ component: RootLayout })
