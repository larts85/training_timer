import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import LangButtons from './LangButtons'

// Mock next/navigation
const mockUsePathname = jest.fn()
jest.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
}))

describe('LangButtons', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render language buttons excluding current locale', () => {
    mockUsePathname.mockReturnValue('/en-US')

    render(<LangButtons currentLocale="en-US" />)

    expect(screen.getByText('es')).toBeInTheDocument()
    expect(screen.getByText('pt')).toBeInTheDocument()
    expect(screen.queryByText('en')).not.toBeInTheDocument()
  })

  it('should generate correct href for different locales', () => {
    mockUsePathname.mockReturnValue('/en-US/some-page')

    render(<LangButtons currentLocale="en-US" />)

    const esLink = screen.getByText('es').closest('a')
    const ptLink = screen.getByText('pt').closest('a')

    expect(esLink).toHaveAttribute('href', '/es-AR/some-page')
    expect(ptLink).toHaveAttribute('href', '/pt-BR/some-page')
  })

  it('should handle root path correctly', () => {
    mockUsePathname.mockReturnValue('/pt-BR')

    render(<LangButtons currentLocale="pt-BR" />)

    const enLink = screen.getByText('en').closest('a')
    const esLink = screen.getByText('es').closest('a')

    expect(enLink).toHaveAttribute('href', '/en-US')
    expect(esLink).toHaveAttribute('href', '/es-AR')
  })
})
