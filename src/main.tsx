import { createRouter, RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import type { Locale } from '@/i18n'
import { init, RTL_LOCALES } from '@/i18n'
import { routeTree } from '@/tanstackRouteTree.gen'
import '@/style.css'

init()

document.documentElement.dir = RTL_LOCALES.has(localStorage.getItem('locale') as Locale) ? 'rtl' : 'ltr'

const router = createRouter({ routeTree })

const rootElement = document.getElementById('root') as HTMLElement

if (!rootElement.innerHTML) {
  const root = createRoot(rootElement)
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
  rootElement.ownerDocument.getElementById('loader')?.remove()
}
