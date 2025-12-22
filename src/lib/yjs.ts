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
  { name: '🥥', color: '#f4f3ef' },
  { name: '🍿', color: '#e8cdb9' },
  { name: '🍟', color: '#efc276' },
  { name: '🧀', color: '#ffdc44' },
  { name: '🥑', color: '#f7f79e' },
  { name: '🍫', color: '#a6644f' },
  { name: '🍬', color: '#eec2ff' },
  { name: '🍭', color: '#ed674f' },
]

export const getRandomCursor = () => cursors[Math.floor(Math.random() * cursors.length)]

export const ROOM_ID = 'room_id'

export const SIGNALING = 'wss://error.run/webrtc'
