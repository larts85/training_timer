import { getTranslations, getStaticTranslations } from '../utils/translations'

describe('Translations utilities', () => {
  describe('getTranslations', () => {
    it('should return English translations for en-US locale', async () => {
      const translations = await getTranslations('en-US')
      expect(translations.home.greeting).toBe('Hello world')
    })

    it('should return Spanish translations for es-AR locale', async () => {
      const translations = await getTranslations('es-AR')
      expect(translations.home.greeting).toBe('Hola mundo')
    })

    it('should return Portuguese translations for pt-BR locale', async () => {
      const translations = await getTranslations('pt-BR')
      expect(translations.home.greeting).toBe('Olá mundo')
    })

    it('should return default Spanish translations for invalid locale', async () => {
      const translations = await getTranslations('invalid-locale')
      expect(translations.home.greeting).toBe('Hola mundo')
    })
  })

  describe('getStaticTranslations', () => {
    it('should return English translations for en-US locale', () => {
      const translations = getStaticTranslations('en-US')
      expect(translations.home.greeting).toBe('Hello world')
    })

    it('should return Spanish translations for es-AR locale', () => {
      const translations = getStaticTranslations('es-AR')
      expect(translations.home.greeting).toBe('Hola mundo')
    })

    it('should return Portuguese translations for pt-BR locale', () => {
      const translations = getStaticTranslations('pt-BR')
      expect(translations.home.greeting).toBe('Olá mundo')
    })

    it('should return default Spanish translations for invalid locale', () => {
      const translations = getStaticTranslations('invalid-locale')
      expect(translations.home.greeting).toBe('Hola mundo')
    })
  })
})
