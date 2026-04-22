import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'

const mockLocalStorage = {
  store: {} as Record<string, string>,
  getItem: vi.fn((key: string) => mockLocalStorage.store[key] || null),
  setItem: vi.fn((key: string, value: string) => {
    mockLocalStorage.store[key] = value
  }),
  removeItem: vi.fn((key: string) => {
    delete mockLocalStorage.store[key]
  }),
  clear: vi.fn(() => {
    mockLocalStorage.store = {}
  }),
}

Object.defineProperty(globalThis, 'localStorage', {
  value: mockLocalStorage,
  writable: true,
})

describe('i18n Module', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockLocalStorage.store = {}
  })

  afterEach(() => {
    mockLocalStorage.clear()
  })

  describe('getContent behavior', () => {
    it('should return empty string when no locale is stored', async () => {
      const { getContent } = await import('@/i18n')
      mockLocalStorage.store = {}
      const result = getContent('editor.placeholder')
      expect(result).toBe('')
    })

    it('should return truthy value for existing key with en locale', async () => {
      const { getContent } = await import('@/i18n')
      mockLocalStorage.store = { locale: 'en' }
      const result = getContent('editor.placeholder')
      expect(result).toBeTruthy()
    })

    it('should return truthy value for zh locale', async () => {
      const { getContent } = await import('@/i18n')
      mockLocalStorage.store = { locale: 'zh' }
      const result = getContent('editor.placeholder')
      expect(result).toBeTruthy()
    })

    it('should return undefined for nonexistent key', async () => {
      const { getContent } = await import('@/i18n')
      mockLocalStorage.store = { locale: 'en' }
      const result = getContent('nonexistent.key')
      expect(result).toBeUndefined()
    })
  })

  describe('init behavior', () => {
    it('should call setItem with locale', async () => {
      const { init } = await import('@/i18n')
      Object.defineProperty(globalThis, 'navigator', {
        value: { language: 'en-US' },
        writable: true,
      })
      init()
      expect(mockLocalStorage.setItem).toHaveBeenCalled()
    })

    it('should set locale to zh for zh-CN browser language', async () => {
      const { init } = await import('@/i18n')
      Object.defineProperty(globalThis, 'navigator', {
        value: { language: 'zh-CN' },
        writable: true,
      })
      init()
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('locale', 'zh')
    })

    it('should set locale to zh for zh-TW browser language', async () => {
      const { init } = await import('@/i18n')
      Object.defineProperty(globalThis, 'navigator', {
        value: { language: 'zh-TW' },
        writable: true,
      })
      init()
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('locale', 'zh')
    })

    it('should set locale to zh for zh-HK browser language', async () => {
      const { init } = await import('@/i18n')
      Object.defineProperty(globalThis, 'navigator', {
        value: { language: 'zh-HK' },
        writable: true,
      })
      init()
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('locale', 'zh')
    })

    it('should set locale to en for en-US browser language', async () => {
      const { init } = await import('@/i18n')
      Object.defineProperty(globalThis, 'navigator', {
        value: { language: 'en-US' },
        writable: true,
      })
      init()
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('locale', 'en')
    })

    it('should handle Chinese speaking locales correctly', async () => {
      const { init } = await import('@/i18n')
      const chineseLocales = ['zh', 'zh-CN', 'zh-TW', 'zh-HK']
      for (const locale of chineseLocales) {
        mockLocalStorage.clear()
        Object.defineProperty(globalThis, 'navigator', {
          value: { language: locale },
          writable: true,
        })
        init()
        expect(mockLocalStorage.setItem).toHaveBeenCalledWith('locale', 'zh')
      }
    })
  })
})