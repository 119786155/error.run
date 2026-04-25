import { describe, expect, it } from 'vitest'
import { getRandomCursor, ROOM_ID, SIGNALING } from '../../../src/lib/yjs'

describe('yjs', () => {
  describe('getRandomCursor', () => {
    it('should return a cursor object', () => {
      const cursor = getRandomCursor()
      expect(cursor).toHaveProperty('name')
      expect(cursor).toHaveProperty('color')
    })

    it('should return a cursor with valid properties', () => {
      const cursor = getRandomCursor()
      expect(typeof cursor.name).toBe('string')
      expect(cursor.name.length).toBeGreaterThan(0)
      expect(cursor.color).toMatch(/^#[0-9a-f]{6}$/i)
    })
  })

  describe('ROOM_ID', () => {
    it('should be a non-empty string', () => {
      expect(ROOM_ID).toBe('room_id')
      expect(typeof ROOM_ID).toBe('string')
      expect(ROOM_ID.length).toBeGreaterThan(0)
    })
  })

  describe('SIGNALING', () => {
    it('should be a valid WebSocket URL', () => {
      expect(SIGNALING).toBe('wss://error.run/webrtc')
      expect(SIGNALING).toMatch(/^wss?:\/\//)
    })
  })
})
