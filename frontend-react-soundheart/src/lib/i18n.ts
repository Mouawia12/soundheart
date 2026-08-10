import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from '@/locales/en'
import ar from '@/locales/ar'

export const LANGS = ['en', 'ar'] as const
export type Lang = (typeof LANGS)[number]

/** Apply <html dir/lang> for the given language (RTL for Arabic). */
export function applyDirection(lng: string) {
  const isAr = lng.startsWith('ar')
  const root = document.documentElement
  root.setAttribute('lang', isAr ? 'ar' : 'en')
  root.setAttribute('dir', isAr ? 'rtl' : 'ltr')
}

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    fallbackLng: 'en',
    supportedLngs: LANGS as unknown as string[],
    nonExplicitSupportedLngs: true,
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'soundheart_lang',
      caches: ['localStorage'],
    },
  })

// Keep <html dir/lang> in sync with the active language.
applyDirection(i18n.resolvedLanguage ?? i18n.language ?? 'en')
i18n.on('languageChanged', applyDirection)

export default i18n
