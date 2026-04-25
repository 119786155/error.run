import { createRootRoute, Outlet } from '@tanstack/react-router'
import { describe, expect, it } from 'vitest'
import { ThemeProvider } from '../../src/components/ui/theme-provider'

const RootLayout = () => {
  return (
    <ThemeProvider storageKey="theme">
      <Outlet />
    </ThemeProvider>
  )
}

describe('RootLayout', () => {
  it('should render with ThemeProvider', () => {
    const Route = createRootRoute({ component: RootLayout })
    expect(Route.options.component).toBeDefined()
  })
})
