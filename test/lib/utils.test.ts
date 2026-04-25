import { describe, expect, it } from 'vitest'
import { cn, getDataURL } from '../../src/lib/utils'

describe('utils', () => {
  describe('cn', () => {
    it('should merge class names', () => {
      const result = cn('foo', 'bar')
      expect(result).toBe('foo bar')
    })

    it('should handle undefined inputs', () => {
      const result = cn('foo', undefined, 'bar')
      expect(result).toBe('foo bar')
    })

    it('should handle empty inputs', () => {
      const result = cn()
      expect(result).toBe('')
    })
  })

  describe('getDataURL', () => {
    it('should return data URL from File object', async () => {
      const content = 'hello world'
      const blob = new Blob([content], { type: 'text/plain' })
      const file = new File([blob], 'test.txt', { type: 'text/plain' })

      const result = await getDataURL(file)
      expect(result).toContain('data:text/plain;base64,')
    })

    it('should return a Promise that resolves to string or ArrayBuffer', async () => {
      const content = 'hello world'
      const blob = new Blob([content], { type: 'text/plain' })
      const file = new File([blob], 'test.txt', { type: 'text/plain' })

      const result = await getDataURL(file)
      expect(result).not.toBeNull()
      expect(typeof result).toMatch(/^(string|object)$/)
    })
  })
})
