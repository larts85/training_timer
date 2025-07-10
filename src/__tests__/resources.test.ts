import languages from '../locales/resources'

describe('Resources', () => {
  it('should export languages object', () => {
    expect(languages).toBeDefined()
    expect(typeof languages).toBe('object')
  })

  it('should have English translations', () => {
    expect(languages).toHaveProperty('en-US')
    expect(languages['en-US']).toBeDefined()
  })

  it('should have Spanish translations', () => {
    expect(languages).toHaveProperty('es-AR')
    expect(languages['es-AR']).toBeDefined()
  })

  it('should have Portuguese translations', () => {
    expect(languages).toHaveProperty('pt-BR')
    expect(languages['pt-BR']).toBeDefined()
  })

  it('should have consistent keys across all locales', () => {
    const locales = Object.keys(languages)
    const englishKeys = Object.keys(languages['en-US'])

    locales.forEach((locale) => {
      const localeKeys = Object.keys(languages[locale])
      expect(localeKeys).toEqual(englishKeys)
    })
  })

  it('should have home.greeting key in all locales', () => {
    const locales = Object.keys(languages)

    locales.forEach((locale) => {
      expect(languages[locale]).toHaveProperty('home')
      expect(languages[locale].home).toHaveProperty('greeting')
    })
  })
})
