import randomColor from 'randomColor'
import { YjsPlugin } from '@platejs/yjs/react'
import { RemoteCursorOverlay } from '@/components/ui/remote-cursor-overlay'

const name = `🥝 ${Math.random()}`
const color = randomColor()
const type = 'webrtc'
const roomName = 'document-id'
const signaling = ['ws://localhost:4444']

export const YjsKit = [
  YjsPlugin.configure({
    render: {
      afterEditable: RemoteCursorOverlay,
    },
    options: {
      cursors: { data: { name, color } },
      providers: [{ type, options: { roomName, signaling } }],
    },
  }),
]
