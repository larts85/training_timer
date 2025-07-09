import enTranslations from '@/locales/translation-en.json'
import esTranslations from '@/locales/translation-es.json'
import ptTranslations from '@/locales/translation-pt.json'

const translations = {
  'en-US': enTranslations,
  'es-AR': esTranslations,
  'pt-BR': ptTranslations,
}

export async function getTranslations(locale: string) {
  const normalizedLocale = locale as keyof typeof translations
  return translations[normalizedLocale] || translations['es-AR']
}

export function getStaticTranslations(locale: string) {
  const normalizedLocale = locale as keyof typeof translations
  return translations[normalizedLocale] || translations['es-AR']
}
