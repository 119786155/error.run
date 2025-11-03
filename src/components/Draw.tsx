import type { THEME } from '@excalidraw/excalidraw'
import { Excalidraw } from '@excalidraw/excalidraw'
import { useEffect } from 'react'
import { useTheme } from '@/components/ThemeProvider'
import '@excalidraw/excalidraw/index.css'

type Theme = (typeof THEME)[keyof typeof THEME]

export const Draw = () => {
  const { theme } = useTheme()

  useEffect(() => {
    document.querySelector('.draw-panel')?.scrollIntoView?.({
      behavior: 'smooth',
    })
  }, [])

  return (
    <div className={`draw-panel h-dvh`}>
      <Excalidraw theme={theme as Theme} />
    </div>
  )
}
