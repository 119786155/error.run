import { TourProvider } from '@reactour/tour'
import type { ReactElement } from 'react'

export const Tutorial = ({ children }: { children: ReactElement }) => {
  const steps = [
    {
      selector: '#toolbar-container',
      content: '几乎所有编辑功能都在这里',
    },
    {
      selector: '#step-2',
      content: '当需要进入只读模式，可以点击此按钮',
    },
  ]

  return (
    <TourProvider
      steps={steps}
      styles={{
        popover: (base) => ({
          ...base,
          '--reactour-accent': 'oklch(0.541 0.281 293.009)',
          borderRadius: 3,
          color: '#000',
        }),
        maskArea: (base) => ({ ...base, rx: 3 }),
        maskWrapper: (base) => ({ ...base, color: 'oklch(0.541 0.281 293.009)' }),
        badge: (base) => ({ ...base, left: 'auto', right: '-0.8125em' }),
        controls: (base) => ({ ...base, marginTop: 100 }),
        close: (base) => ({ ...base, right: 'auto', left: 8, top: 8 }),
        // highlightedArea: (base, { x, y }) => ({ ...base, x, y }),
      }}
    >
      {children}
    </TourProvider>
  )
}
