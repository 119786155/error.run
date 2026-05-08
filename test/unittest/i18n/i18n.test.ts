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
      const { getContent } = await import('../../../src/i18n')
      mockLocalStorage.store = {}
      Object.defineProperty(globalThis, 'navigator', {
        value: { language: 'en-US' },
        writable: true,
      })
      const result = getContent('editor.placeholder')
      expect(result).toBe('Type something...')
    })

    it('should return zh translation when browser locale is zh-CN', async () => {
      const { getContent } = await import('../../../src/i18n')
      mockLocalStorage.store = {}
      Object.defineProperty(globalThis, 'navigator', {
        value: { language: 'zh-CN' },
        writable: true,
      })
      const result = getContent('editor.placeholder')
      expect(result).toBe('写一写...')
    })

    it('should return zh translation when locale is stored as zh', async () => {
      const { getContent } = await import('../../../src/i18n')
      mockLocalStorage.store = { locale: 'zh' }
      const result = getContent('editor.placeholder')
      expect(result).toBe('写一写...')
    })

    it('should return en translation when locale is stored as en', async () => {
      const { getContent } = await import('../../../src/i18n')
      mockLocalStorage.store = { locale: 'en' }
      const result = getContent('editor.placeholder')
      expect(result).toBe('Type something...')
    })

    it('should return empty string when translation not found', async () => {
      const { getContent } = await import('../../../src/i18n')
      mockLocalStorage.store = { locale: 'en' }
      const result = getContent('non.existent.key')
      expect(result).toBe('')
    })
  })

  describe('init behavior', () => {
    it('should set locale in localStorage on init', async () => {
      const { init } = await import('../../../src/i18n')
      Object.defineProperty(globalThis, 'navigator', {
        value: { language: 'en-US' },
        writable: true,
      })
      init()
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('locale', 'en')
    })

    it('should set zh locale for Chinese browsers', async () => {
      const { init } = await import('../../../src/i18n')
      Object.defineProperty(globalThis, 'navigator', {
        value: { language: 'zh-CN' },
        writable: true,
      })
      init()
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('locale', 'zh')
    })

    it('should use DEFAULT_LOCALE when browser locale is not supported', async () => {
      const { init } = await import('../../../src/i18n')
      Object.defineProperty(globalThis, 'navigator', {
        value: { language: 'zz-ZZ' },
        writable: true,
      })
      init()
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('locale', 'en')
    })

    it('should use DEFAULT_LOCALE for unknown base language', async () => {
      const { getContent } = await import('../../../src/i18n')
      mockLocalStorage.store = {}
      Object.defineProperty(globalThis, 'navigator', {
        value: { language: 'zz-ZZ' },
        writable: true,
      })
      const result = getContent('editor.placeholder')
      expect(result).toBe('Type something...')
    })
  })

  describe('base language fallback', () => {
    it('should fallback to base language for unlisted Spanish region variants', async () => {
      const { getContent } = await import('../../../src/i18n')
      mockLocalStorage.store = {}
      Object.defineProperty(globalThis, 'navigator', {
        value: { language: 'es-CL' },
        writable: true,
      })
      const result = getContent('editor.placeholder')
      expect(result).toBe('Escribe algo...')
    })

    it('should fallback to base language for unlisted Portuguese variant', async () => {
      const { getContent } = await import('../../../src/i18n')
      mockLocalStorage.store = {}
      Object.defineProperty(globalThis, 'navigator', {
        value: { language: 'pt-AO' },
        writable: true,
      })
      const result = getContent('editor.placeholder')
      expect(result).toBe('Digite algo...')
    })

    it('should fallback to base language for Simplified Chinese', async () => {
      const { getContent } = await import('../../../src/i18n')
      mockLocalStorage.store = {}
      Object.defineProperty(globalThis, 'navigator', {
        value: { language: 'zh-Hans' },
        writable: true,
      })
      const result = getContent('editor.placeholder')
      expect(result).toBe('写一写...')
    })

    it('should use stored locale when browser locale matches via base fallback', async () => {
      const { getContent } = await import('../../../src/i18n')
      mockLocalStorage.store = { locale: 'ja' }
      Object.defineProperty(globalThis, 'navigator', {
        value: { language: 'es-CL' },
        writable: true,
      })
      const result = getContent('editor.placeholder')
      expect(result).toBe('何か書いてください...')
    })

    it('should init to en when both region and base language are unknown', async () => {
      const { init, getContent } = await import('../../../src/i18n')
      mockLocalStorage.store = { locale: 'zh' }
      Object.defineProperty(globalThis, 'navigator', {
        value: { language: 'zz-ZZ' },
        writable: true,
      })
      init()
      const result = getContent('editor.placeholder')
      expect(mockLocalStorage.store.locale).toBe('en')
      expect(result).toBe('Type something...')
    })
  })

  describe('SUPPORTED_LOCALES', () => {
    it('should export SUPPORTED_LOCALES array', async () => {
      const { SUPPORTED_LOCALES } = await import('../../../src/i18n')
      expect(SUPPORTED_LOCALES).toBeDefined()
      expect(Array.isArray(SUPPORTED_LOCALES)).toBe(true)
    })
  })
})
