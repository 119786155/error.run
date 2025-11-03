'use client'
import type { TExcalidrawElement } from '@platejs/excalidraw'
import { useExcalidrawElement } from '@platejs/excalidraw/react'
import { Expand, Shrink } from 'lucide-react'
import type { PlateElementProps } from 'platejs/react'
import { PlateElement, useReadOnly } from 'platejs/react'
import { useCallback, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/components/ui/theme-provider'

import '@excalidraw/excalidraw/index.css'

export function ExcalidrawElement(props: PlateElementProps<TExcalidrawElement>) {
  const { children, element } = props
  const readOnly = useReadOnly()
  const { theme } = useTheme()

  const [fullScreen, setFullScreen] = useState(false)
  const switchFullScreen = useCallback(() => {
    setFullScreen(!fullScreen)
  }, [fullScreen])
  const FullScreenBtn = () => {
    return (
      <Button variant="outline" size="icon" onClick={switchFullScreen} className="bg-[#ececf4]">
        {fullScreen ? (
          <Shrink className="cursor-pointer" strokeWidth={1} />
        ) : (
          <Expand className="cursor-pointer" strokeWidth={1} />
        )}
      </Button>
    )
  }

  const getContainerClassName = useCallback(() => {
    return `mx-auto aspect-video w-full overflow-hidden rounded-sm border ${
      fullScreen ? 'fixed top-0 left-0 z-50 h-full' : 'h-[600px]'
    }`
  }, [fullScreen])

  const { Excalidraw, excalidrawProps } = useExcalidrawElement({
    element,
  })

  return (
    <PlateElement {...props}>
      <div contentEditable={false}>
        <div className={getContainerClassName()}>
          {Excalidraw && (
            <Excalidraw
              {...excalidrawProps}
              viewModeEnabled={readOnly}
              theme={theme}
              renderTopRightUI={() => <FullScreenBtn />}
            />
          )}
        </div>
      </div>
      {children}
    </PlateElement>
  )
}
