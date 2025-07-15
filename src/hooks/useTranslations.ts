'use client'

import { useParams } from 'next/navigation'
import languages, { TranslationFile } from '@/locales/resources'

const useTranslations = () => {
  const params = useParams()
  const locale = (params?.locale as string) || 'es-AR'
  const locales = ['en-US', 'es-AR', 'pt-BR']
  const translations = languages[locale] as TranslationFile

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: unknown = translations

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k]
      } else {
        return key
      }
    }

    return typeof value === 'string' ? value : key
  }

  return { translations, currentLang: locale, langs: locales, t }
}

export default useTranslations
