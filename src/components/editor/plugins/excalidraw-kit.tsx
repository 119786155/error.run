import { ExcalidrawPlugin } from '@platejs/excalidraw/react'
import { ExcalidrawElement } from '@/components/ui/excalidraw-node'

// lodash imports for future use
// import pkg from 'lodash'
// const { cloneDeep, isEqual } = pkg

export const ExcalidrawKit = [ExcalidrawPlugin.withComponent(ExcalidrawElement)]
