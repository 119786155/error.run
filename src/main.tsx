import { createRouter, RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { init } from '@/i18n'
import { routeTree } from '@/tanstackRouteTree.gen'

import '@/style.css'

init()

const router = createRouter({ routeTree })

const rootElement = document.getElementById('root') as HTMLElement

if (!rootElement.innerHTML) {
  createRoot(rootElement).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
}
