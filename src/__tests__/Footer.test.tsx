import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Footer from '../components/Footer/Footer'

// Mock the useTranslations hook
jest.mock('@/hooks/useTranslations', () => {
  return jest.fn(() => ({
    currentLang: 'en-US',
  }))
})

// Mock the LangButtons component
jest.mock('@/components/LangButtons/LangButtons', () => {
  return function MockLangButtons({
    currentLocale,
  }: {
    currentLocale: string
  }) {
    return <div data-testid="lang-buttons">LangButtons: {currentLocale}</div>
  }
})

// Mock the NavButtons component
jest.mock('../components/Footer/NavButtons', () => {
  return function MockNavButtons({ colorMode }: { colorMode: string }) {
    return <div data-testid="nav-buttons">NavButtons: {colorMode}</div>
  }
})

describe('Footer Component', () => {
  it('should render with default props', () => {
    render(<Footer />)

    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
    expect(footer).toHaveClass('bg-white', 'text-gray-900', 'border-gray-200')
  })

  it('should render LangButtons when not mobile', () => {
    render(<Footer isMobile={false} />)

    expect(screen.getByTestId('lang-buttons')).toBeInTheDocument()
    expect(screen.getByText('LangButtons: en-US')).toBeInTheDocument()
    expect(screen.queryByTestId('nav-buttons')).not.toBeInTheDocument()
  })

  it('should render NavButtons when mobile', () => {
    render(<Footer isMobile={true} />)

    expect(screen.getByTestId('nav-buttons')).toBeInTheDocument()
    expect(screen.getByText('NavButtons: light')).toBeInTheDocument()
    expect(screen.queryByTestId('lang-buttons')).not.toBeInTheDocument()
  })

  it('should render with dark color mode', () => {
    render(<Footer colorMode="dark" />)

    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveClass('bg-gray-900', 'text-white', 'border-gray-700')
  })

  it('should render with light color mode', () => {
    render(<Footer colorMode="light" />)

    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveClass('bg-white', 'text-gray-900', 'border-gray-200')
  })

  it('should render with rounded corners', () => {
    render(<Footer cornerMode="rounded" />)

    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveClass('rounded-t-lg')
  })

  it('should render with square corners', () => {
    render(<Footer cornerMode="square" />)

    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveClass('rounded-none')
  })

  it('should apply custom className', () => {
    const customClass = 'custom-footer-class'
    render(<Footer className={customClass} />)

    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveClass(customClass)
  })

  it('should have proper structure with max-width container', () => {
    render(<Footer />)

    const footer = screen.getByRole('contentinfo')
    const container = footer.querySelector('.max-w-7xl')
    expect(container).toBeInTheDocument()
    expect(container).toHaveClass('mx-auto')
  })

  it('should pass colorMode to NavButtons when mobile', () => {
    render(<Footer isMobile={true} colorMode="dark" />)

    expect(screen.getByText('NavButtons: dark')).toBeInTheDocument()
  })

  it('should have correct displayName', () => {
    expect(Footer.displayName).toBe('Footer')
  })

  it('should render with border styling', () => {
    render(<Footer />)

    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveClass('border-t')
  })
})
