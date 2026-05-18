import { get } from 'lodash'
import { content } from './content'

const STORAGE_KEY = 'locale'

export const SUPPORTED_LOCALES = [
  'zh',
  'en',
  'es',
  'fa',
  'hi',
  'ar',
  'pt',
  'ja',
  'ko',
  'ru',
  'de',
  'fr',
  'id',
  'vi',
  'tr',
  'nl',
  'pl',
  'th',
  'uk',
] as const
export type Locale = (typeof SUPPORTED_LOCALES)[number]

const localeMap: Record<string, Locale> = {
  zh: 'zh',
  'zh-CN': 'zh',
  'zh-TW': 'zh',
  'zh-HK': 'zh',
  en: 'en',
  'en-AU': 'en',
  'en-IN': 'en',
  'en-GB': 'en',
  'en-US': 'en',
  'en-IE': 'en',
  'en-CA': 'en',
  'en-ZA': 'en',
  'en-NZ': 'en',
  es: 'es',
  'es-ES': 'es',
  'es-MX': 'es',
  'es-AR': 'es',
  fa: 'fa',
  'fa-IR': 'fa',
  hi: 'hi',
  'hi-IN': 'hi',
  ar: 'ar',
  'ar-SA': 'ar',
  'ar-AE': 'ar',
  'ar-EG': 'ar',
  pt: 'pt',
  'pt-BR': 'pt',
  'pt-PT': 'pt',
  ja: 'ja',
  'ja-JP': 'ja',
  ko: 'ko',
  'ko-KR': 'ko',
  ru: 'ru',
  'ru-RU': 'ru',
  de: 'de',
  'de-DE': 'de',
  'de-AT': 'de',
  'de-CH': 'de',
  fr: 'fr',
  'fr-FR': 'fr',
  'fr-CA': 'fr',
  'fr-BE': 'fr',
  id: 'id',
  'id-ID': 'id',
  vi: 'vi',
  'vi-VN': 'vi',
  tr: 'tr',
  'tr-TR': 'tr',
  nl: 'nl',
  'nl-NL': 'nl',
  'nl-BE': 'nl',
  pl: 'pl',
  'pl-PL': 'pl',
  th: 'th',
  'th-TH': 'th',
  uk: 'uk',
  'uk-UA': 'uk',
}

const DEFAULT_LOCALE: Locale = 'en'

const setLocale = (locale: string) => localStorage.setItem(STORAGE_KEY, locale)

const getBrowserCurrentLocale = (): Locale => {
  const browserLocale = navigator.language
  const mappedLocale = localeMap[browserLocale]
  if (mappedLocale) {
    return mappedLocale
  }
  const baseLocale = browserLocale.split('-')[0]
  return localeMap[baseLocale] || DEFAULT_LOCALE
}

export const getContent = (path: string): string => {
  const map: Record<string, string> = get(content, path) || {}
  const storageLocale = localStorage.getItem(STORAGE_KEY) as Locale | null

  const locale = storageLocale || getBrowserCurrentLocale()
  return map?.[locale] || ''
}

export const init = () => setLocale(getBrowserCurrentLocale())
