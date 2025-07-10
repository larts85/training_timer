import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import LangButtons from './LangButtons'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/en-US',
}))

describe('LangButtons', () => {
  it('should renders a button for each available language', () => {
    render(<LangButtons currentLocale="en-US" />)

    const spanishButton = screen.getByRole('link', { name: /es/i })
    expect(spanishButton).toBeInTheDocument()

    const portugueseButton = screen.getByRole('link', { name: /pt/i })
    expect(portugueseButton).toBeInTheDocument()
  })

  it('should not generate a button for the current language', () => {
    render(<LangButtons currentLocale="en-US" />)

    const englishButton = screen.queryByRole('link', { name: /en/i })
    expect(englishButton).not.toBeInTheDocument()
  })

  it('should have correct href attributes for language buttons', () => {
    render(<LangButtons currentLocale="en-US" />)

    // With currentLocale="en-US", we should have buttons for "es" and "pt"
    const spanishLink = screen.getByRole('link', { name: /es/i })
    const portugueseLink = screen.getByRole('link', { name: /pt/i })

    // Verify the href attributes are correct
    expect(spanishLink).toHaveAttribute('href', '/es-AR')
    expect(portugueseLink).toHaveAttribute('href', '/pt-BR')
  })
})
