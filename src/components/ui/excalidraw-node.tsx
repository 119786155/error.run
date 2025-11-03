'use client'

import type { TExcalidrawElement } from '@platejs/excalidraw'
import { useExcalidrawElement } from '@platejs/excalidraw/react'
import type { PlateElementProps } from 'platejs/react'
import { PlateElement, useReadOnly } from 'platejs/react'
import { useTheme } from '@/components/ui/theme-provider'

import '@excalidraw/excalidraw/index.css'

export function ExcalidrawElement(props: PlateElementProps<TExcalidrawElement>) {
  const { children, element } = props
  const readOnly = useReadOnly()
  const { theme } = useTheme()

  const { Excalidraw, excalidrawProps } = useExcalidrawElement({
    element,
  })

  return (
    <PlateElement {...props}>
      <div contentEditable={false}>
        <div className="mx-auto aspect-video h-[600px] w-full overflow-hidden rounded-sm border">
          {Excalidraw && <Excalidraw {...excalidrawProps} viewModeEnabled={readOnly} theme={theme} />}
        </div>
      </div>
      {children}
    </PlateElement>
  )
}
