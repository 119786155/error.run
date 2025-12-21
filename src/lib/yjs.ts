const cursors = [
  { name: '🍇', color: '#d47ea2' },
  { name: '🍊', color: '#ffd689' },
  { name: '🍌', color: '#f9eedd' },
  { name: '🍏', color: '#e8fbab' },
  { name: '🍑', color: '#faac65' },
  { name: '🍒', color: '#ffdfe2' },
  { name: '🍓', color: '#a4ce8b' },
  { name: '🫐', color: '#8ccaff' },
  { name: '🥝', color: '#ffffe8' },
  { name: '🍍', color: '#fee77f' },
]

export const getRandomCursor = () => cursors[Math.floor(Math.random() * cursors.length)]

export const ROOM_ID = 'room_id'

export const SIGNALING = 'wss://error.run/webrtc'
