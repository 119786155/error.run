import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
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

    it('RTL_LOCALES should only contain ar and fa', async () => {
      const { RTL_LOCALES, SUPPORTED_LOCALES } = await import('../../../src/i18n')
      expect(RTL_LOCALES).toBeDefined()
      expect(RTL_LOCALES instanceof Set).toBe(true)
      // ar and fa are the only RTL languages
      expect(RTL_LOCALES.has('ar')).toBe(true)
      expect(RTL_LOCALES.has('fa')).toBe(true)
      // All other languages should not be RTL
      for (const locale of SUPPORTED_LOCALES) {
        if (locale !== 'ar' && locale !== 'fa') {
          expect(RTL_LOCALES.has(locale)).toBe(false)
        }
      }
    })
  })

  describe('i18n consistency - content locale coverage', () => {
    const checkCoverage = (
      obj: Record<string, unknown>,
      supported: readonly string[],
      path = '',
    ): string[] => {
      const issues: string[] = []
      if (typeof obj !== 'object' || obj === null) return issues

      // A locale leaf is an object whose keys are all 2-letter locale codes
      const keys = Object.keys(obj)
      if (keys.length > 0 && keys.every((k) => /^[a-z]{2}$/.test(k))) {
        const missing = supported.filter((l) => !(l in obj))
        if (missing.length > 0) {
          issues.push(`${path}: missing [${missing.join(', ')}]`)
        }
        const extra = keys.filter((k) => !supported.includes(k))
        if (extra.length > 0) {
          issues.push(`${path}: unexpected [${extra.join(', ')}]`)
        }
        return issues
      }

      for (const key of keys) {
        issues.push(
          ...checkCoverage(
            (obj as Record<string, Record<string, unknown>>)[key],
            supported,
            path ? `${path}.${key}` : key,
          ),
        )
      }
      return issues
    }

    it('app.ts: all keys have all SUPPORTED_LOCALES', async () => {
      const { SUPPORTED_LOCALES } = await import('../../../src/i18n')
      const { app } = await import('../../../src/i18n/content/app')
      expect(checkCoverage(app, SUPPORTED_LOCALES)).toEqual([])
    })

    it('model.ts: all keys have all SUPPORTED_LOCALES', async () => {
      const { SUPPORTED_LOCALES } = await import('../../../src/i18n')
      const { model } = await import('../../../src/i18n/content/model')
      expect(checkCoverage(model, SUPPORTED_LOCALES)).toEqual([])
    })

    it('not-found.ts: all keys have all SUPPORTED_LOCALES', async () => {
      const { SUPPORTED_LOCALES } = await import('../../../src/i18n')
      const { notFound } = await import('../../../src/i18n/content/not-found')
      expect(checkCoverage(notFound, SUPPORTED_LOCALES)).toEqual([])
    })

    it('poem.ts: all keys have all SUPPORTED_LOCALES', async () => {
      const { SUPPORTED_LOCALES } = await import('../../../src/i18n')
      const { poem } = await import('../../../src/i18n/content/poem')
      expect(checkCoverage(poem, SUPPORTED_LOCALES)).toEqual([])
    })

    it('recordation.ts: all keys have all SUPPORTED_LOCALES', async () => {
      const { SUPPORTED_LOCALES } = await import('../../../src/i18n')
      const { recordation } = await import('../../../src/i18n/content/recordation')
      expect(checkCoverage(recordation, SUPPORTED_LOCALES)).toEqual([])
    })

    it('editor.ts: all keys have all SUPPORTED_LOCALES', async () => {
      const { SUPPORTED_LOCALES } = await import('../../../src/i18n')
      const { editor } = await import('../../../src/i18n/content/editor')
      expect(checkCoverage(editor, SUPPORTED_LOCALES)).toEqual([])
    })
  })

  describe('i18n consistency - .env recordation variables', () => {
    it('should have VITE_PSR and VITE_ICP for every supported locale', async () => {
      const { SUPPORTED_LOCALES } = await import('../../../src/i18n')
      const envPath = resolve(__dirname, '../../../test/fixtures/.env.example')
      const envContent = readFileSync(envPath, 'utf-8')
      const missing: string[] = []
      for (const locale of SUPPORTED_LOCALES) {
        const upper = locale.toUpperCase()
        if (!new RegExp(`VITE_PSR_${upper}=`).test(envContent)) {
          missing.push(`VITE_PSR_${upper}`)
        }
        if (!new RegExp(`VITE_ICP_${upper}=`).test(envContent)) {
          missing.push(`VITE_ICP_${upper}`)
        }
      }
      expect(missing).toEqual([])
    })
  })

  describe('i18n consistency - README language links', () => {
    it('should have a link for every supported locale except en', async () => {
      const { SUPPORTED_LOCALES } = await import('../../../src/i18n')
      const readmePath = resolve(__dirname, '../../../README.md')
      const readmeContent = readFileSync(readmePath, 'utf-8')
      const missing: string[] = []
      for (const locale of SUPPORTED_LOCALES) {
        if (locale === 'en') continue
        if (!readmeContent.includes(`docs/README.${locale}.md`)) {
          missing.push(locale)
        }
      }
      expect(missing).toEqual([])
    })

    it('should have a translated README file for every locale except en', async () => {
      const { SUPPORTED_LOCALES } = await import('../../../src/i18n')
      const missing: string[] = []
      for (const locale of SUPPORTED_LOCALES) {
        if (locale === 'en') continue
        const readmePath = resolve(__dirname, `../../../docs/README.${locale}.md`)
        if (!existsSync(readmePath)) {
          missing.push(locale)
        }
      }
      expect(missing).toEqual([])
    })
  })
})
