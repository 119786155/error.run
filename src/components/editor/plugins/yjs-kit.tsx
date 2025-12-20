'use client'

import { YjsPlugin } from '@platejs/yjs/react'
import { RemoteCursorOverlay } from '@/components/ui/remote-cursor-overlay'

export const YjsKit = [
  YjsPlugin.configure({
    render: {
      afterEditable: RemoteCursorOverlay,
    },
    options: {
      cursors: {
        data: {
          name: 'User Name',
          color: '#aabbcc',
        },
      },
      providers: [
        {
          type: 'webrtc',
          options: {
            roomName: 'your_doc',
            signaling: ['ws://localhost:4444'],
          },
        },
      ],
    },
  }),
]
