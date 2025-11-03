import get from 'lodash/get'
import { content } from './content'

const STORAGE_KEY = 'locale'
const LOCALE_ZH = 'zh'
const LOCALE_EN = 'en'

/*
const localesSpeakEnglish = [
  LOCALE_EN,
  'en-AU',
  'en-IN',
  'en-GB',
  'en-GB-oxendict',
  'en-US',
  'en-IE',
  'en-CA',
  'en-ZA',
  'en-NZ',
]
*/

const localesSpeakChinese = [LOCALE_ZH, 'zh-CN', 'zh-TW', 'zh-HK']
// const getLocale = () => localStorage.getItem(STORAGE_KEY)
const setLocale = (locale: string) => localStorage.setItem(STORAGE_KEY, locale)
const getBrowserCurrentLocale = () => {
  const locle = navigator.language || LOCALE_EN
  return localesSpeakChinese.includes(locle) ? LOCALE_ZH : LOCALE_EN
}

export const getContent = (path: string) => {
  const map: Record<string, string> = get(content, path) || {}
  const storageLocale = localStorage.getItem(STORAGE_KEY)

  return storageLocale ? map?.[storageLocale] : ''
}

export const init = () => setLocale(getBrowserCurrentLocale())
