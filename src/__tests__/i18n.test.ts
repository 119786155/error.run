import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

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
    it('should return translation based on browser locale when no locale stored', async () => {
      const { getContent } = await import('@/i18n')
      mockLocalStorage.store = {}
      Object.defineProperty(globalThis, 'navigator', {
        value: { language: 'en-US' },
        writable: true,
      })
      const result = getContent('editor.placeholder')
      expect(result).toBe('Type something...')
    })

    it('should return zh translation when browser locale is zh-CN', async () => {
      const { getContent } = await import('@/i18n')
      mockLocalStorage.store = {}
      Object.defineProperty(globalThis, 'navigator', {
        value: { language: 'zh-CN' },
        writable: true,
      })
      const result = getContent('editor.placeholder')
      expect(result).toBe('写一写...')
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

    it('should return truthy value for es locale', async () => {
      const { getContent } = await import('@/i18n')
      mockLocalStorage.store = { locale: 'es' }
      const result = getContent('editor.placeholder')
      expect(result).toBe('Escribe algo...')
    })

    it('should return truthy value for ja locale', async () => {
      const { getContent } = await import('@/i18n')
      mockLocalStorage.store = { locale: 'ja' }
      const result = getContent('editor.placeholder')
      expect(result).toBe('何か書いてください...')
    })

    it('should return empty string for nonexistent key', async () => {
      const { getContent } = await import('@/i18n')
      mockLocalStorage.store = { locale: 'en' }
      const result = getContent('nonexistent.key')
      expect(result).toBe('')
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

    it('should set locale to es for es-ES browser language', async () => {
      const { init } = await import('@/i18n')
      Object.defineProperty(globalThis, 'navigator', {
        value: { language: 'es-ES' },
        writable: true,
      })
      init()
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('locale', 'es')
    })

    it('should set locale to ja for ja-JP browser language', async () => {
      const { init } = await import('@/i18n')
      Object.defineProperty(globalThis, 'navigator', {
        value: { language: 'ja-JP' },
        writable: true,
      })
      init()
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('locale', 'ja')
    })

    it('should set locale to ko for ko-KR browser language', async () => {
      const { init } = await import('@/i18n')
      Object.defineProperty(globalThis, 'navigator', {
        value: { language: 'ko-KR' },
        writable: true,
      })
      init()
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('locale', 'ko')
    })

    it('should set locale to ru for ru-RU browser language', async () => {
      const { init } = await import('@/i18n')
      Object.defineProperty(globalThis, 'navigator', {
        value: { language: 'ru-RU' },
        writable: true,
      })
      init()
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('locale', 'ru')
    })

    it('should set locale to de for de-DE browser language', async () => {
      const { init } = await import('@/i18n')
      Object.defineProperty(globalThis, 'navigator', {
        value: { language: 'de-DE' },
        writable: true,
      })
      init()
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('locale', 'de')
    })

    it('should set locale to hi for hi-IN browser language', async () => {
      const { init } = await import('@/i18n')
      Object.defineProperty(globalThis, 'navigator', {
        value: { language: 'hi-IN' },
        writable: true,
      })
      init()
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('locale', 'hi')
    })

    it('should set locale to pt for pt-BR browser language', async () => {
      const { init } = await import('@/i18n')
      Object.defineProperty(globalThis, 'navigator', {
        value: { language: 'pt-BR' },
        writable: true,
      })
      init()
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('locale', 'pt')
    })

    it('should set locale to ar for ar-SA browser language', async () => {
      const { init } = await import('@/i18n')
      Object.defineProperty(globalThis, 'navigator', {
        value: { language: 'ar-SA' },
        writable: true,
      })
      init()
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('locale', 'ar')
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

    it('should default to en for unsupported locales', async () => {
      const { init } = await import('@/i18n')
      Object.defineProperty(globalThis, 'navigator', {
        value: { language: 'fr-FR' },
        writable: true,
      })
      init()
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('locale', 'en')
    })
  })
})
