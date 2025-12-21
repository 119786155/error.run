'use client'

import { YjsPlugin } from '@platejs/yjs/react'
import { RemoteCursorOverlay } from '@/components/ui/remote-cursor-overlay'
import { getRandomCursor, ROOM_ID, SIGNALING } from '@/lib/yjs'

export const YjsKit = [
  YjsPlugin.configure({
    render: {
      afterEditable: RemoteCursorOverlay,
    },
    options: {
      cursors: {
        data: getRandomCursor(),
      },
      providers: [
        {
          type: 'webrtc',
          options: {
            roomName: ROOM_ID,
            signaling: [SIGNALING],
          },
        },
      ],
    },
  }),
]
