import { createRouter, RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Tutorial } from '@/components/tutorial'
import { init } from '@/i18n'
import { routeTree } from '@/tanstackRouteTree.gen'
import '@/style.css'

init()

const router = createRouter({ routeTree })

const rootElement = document.getElementById('root') as HTMLElement

if (!rootElement.innerHTML) {
  createRoot(rootElement).render(
    <StrictMode>
      <Tutorial>
        <RouterProvider router={router} />
      </Tutorial>
    </StrictMode>,
  )
}
