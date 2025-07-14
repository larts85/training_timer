import { render, screen } from '@testing-library/react'
import Header from '../components/Header/Header'
import { getStaticTranslations } from '../utils/translations'

// Mock the translations utility
jest.mock('../utils/translations', () => ({
  getStaticTranslations: jest.fn(),
}))

// Mock the LangButtons component
jest.mock('../components/LangButtons/LangButtons', () => {
  return function MockLangButtons({
    currentLocale,
  }: {
    currentLocale: string
  }) {
    return <div data-testid="lang-buttons">LangButtons({currentLocale})</div>
  }
})

const mockGetStaticTranslations = getStaticTranslations as jest.Mock

// Mock translations data
const mockTranslations = {
  navLinks: {
    home: 'Home',
    anchorTitle: 'Timer Settings',
  },
}

const mockTranslationsEs = {
  navLinks: {
    home: 'Inicio',
    anchorTitle: 'Configuración del Timer',
  },
}

describe('Header Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render header with correct structure and title', () => {
    mockGetStaticTranslations.mockReturnValue(mockTranslations)

    render(<Header locale="en" />)

    // Check main header element
    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()

    // Check title
    const title = screen.getByRole('heading', { level: 1 })
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent('Training Timer')
  })

  it('should call getStaticTranslations with correct locale', () => {
    mockGetStaticTranslations.mockReturnValue(mockTranslations)

    render(<Header locale="en" />)

    expect(mockGetStaticTranslations).toHaveBeenCalledWith('en')
    expect(mockGetStaticTranslations).toHaveBeenCalledTimes(1)
  })

  it('should render navigation links with English translations', () => {
    mockGetStaticTranslations.mockReturnValue(mockTranslations)

    render(<Header locale="en" />)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Timer Settings')).toBeInTheDocument()
  })

  it('should render navigation links with Spanish translations', () => {
    mockGetStaticTranslations.mockReturnValue(mockTranslationsEs)

    render(<Header locale="es" />)

    expect(mockGetStaticTranslations).toHaveBeenCalledWith('es')
    expect(screen.getByText('Inicio')).toBeInTheDocument()
    expect(screen.getByText('Configuración del Timer')).toBeInTheDocument()
  })

  it('should render LangButtons component with correct locale prop', () => {
    mockGetStaticTranslations.mockReturnValue(mockTranslations)

    render(<Header locale="en" />)

    const langButtons = screen.getByTestId('lang-buttons')
    expect(langButtons).toBeInTheDocument()
    expect(langButtons).toHaveTextContent('LangButtons(en)')
  })

  it('should render LangButtons with different locale', () => {
    mockGetStaticTranslations.mockReturnValue(mockTranslationsEs)

    render(<Header locale="es-AR" />)

    const langButtons = screen.getByTestId('lang-buttons')
    expect(langButtons).toBeInTheDocument()
    expect(langButtons).toHaveTextContent('LangButtons(es-AR)')
  })

  it('should have correct CSS classes for styling', () => {
    mockGetStaticTranslations.mockReturnValue(mockTranslations)

    render(<Header locale="en" />)

    const header = screen.getByRole('banner')
    expect(header).toHaveClass(
      'w-full',
      'bg-white',
      'dark:bg-gray-800',
      'shadow-sm',
    )

    const title = screen.getByRole('heading', { level: 1 })
    expect(title).toHaveClass(
      'text-xl',
      'font-bold',
      'text-gray-900',
      'dark:text-white',
    )
  })

  it('should render navigation as list items', () => {
    mockGetStaticTranslations.mockReturnValue(mockTranslations)

    render(<Header locale="en" />)

    const navList = screen.getByRole('list')
    expect(navList).toBeInTheDocument()

    const listItems = screen.getAllByRole('listitem')
    expect(listItems).toHaveLength(2)
  })

  it('should have correct displayName', () => {
    expect(Header.displayName).toBe('Header')
  })

  it('should handle different locales correctly', () => {
    // Test with pt locale
    const mockTranslationsPt = {
      navLinks: {
        home: 'Início',
        anchorTitle: 'Configurações do Timer',
      },
    }

    mockGetStaticTranslations.mockReturnValue(mockTranslationsPt)

    render(<Header locale="pt" />)

    expect(mockGetStaticTranslations).toHaveBeenCalledWith('pt')
    expect(screen.getByText('Início')).toBeInTheDocument()
    expect(screen.getByText('Configurações do Timer')).toBeInTheDocument()

    const langButtons = screen.getByTestId('lang-buttons')
    expect(langButtons).toHaveTextContent('LangButtons(pt)')
  })

  it('should handle empty translations gracefully', () => {
    const emptyTranslations = {
      navLinks: {
        home: '',
        anchorTitle: '',
      },
    }

    mockGetStaticTranslations.mockReturnValue(emptyTranslations)

    expect(() => {
      render(<Header locale="en" />)
    }).not.toThrow()

    // Should still render structure even with empty translations
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(screen.getByTestId('lang-buttons')).toBeInTheDocument()
  })
})
