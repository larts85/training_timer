import { renderHook } from '@testing-library/react'
import '@testing-library/jest-dom'
import useTranslations from './useTranslations'

jest.mock('next/navigation', () => ({
  useParams: jest.fn(() => ({ locale: 'en-US' })),
}))

describe('useTranslations', () => {
  it('should return the correct translations, currentLang and langs', () => {
    const { result } = renderHook(() => useTranslations())
    const { translations, currentLang, langs, t } = result.current
    expect(translations.home.greeting).toBe('Hello world')
    expect(currentLang).toBe('en-US')
    expect(langs).toContain('pt-BR')
    expect(typeof t).toBe('function')
  })

  it('should return translation function that accesses nested keys', () => {
    const { result } = renderHook(() => useTranslations())
    const { t } = result.current
    expect(t('home.greeting')).toBe('Hello world')
    expect(typeof t).toBe('function')
  })

  it('should return fallback for missing keys', () => {
    const { result } = renderHook(() => useTranslations())
    const { t } = result.current
    expect(t('missing.key')).toBe('missing.key')
  })
})
