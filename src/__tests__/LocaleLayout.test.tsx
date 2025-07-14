import { render, screen } from '@testing-library/react'
import LocaleLayout, { generateStaticParams } from '../app/[locale]/layout'
import { notFound } from 'next/navigation'

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}))

const mockNotFound = jest.mocked(notFound)

// Helper to create a resolved promise for params
const createParamsPromise = (locale: string) => Promise.resolve({ locale })

describe('LocaleLayout', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render children with correct lang attribute for valid English locale', async () => {
    const TestComponent = () => (
      <div data-testid="test-content">Test content</div>
    )

    const params = createParamsPromise('en-US')

    const RenderedLayout = await LocaleLayout({
      children: <TestComponent />,
      params,
    })

    render(RenderedLayout)

    const container = screen.getByTestId('test-content').parentElement
    expect(container).toHaveAttribute('lang', 'en-US')
    expect(screen.getByTestId('test-content')).toBeInTheDocument()
    expect(mockNotFound).not.toHaveBeenCalled()
  })

  it('should render children with correct lang attribute for valid Spanish locale', async () => {
    const TestComponent = () => (
      <div data-testid="test-content">Contenido de prueba</div>
    )

    const params = createParamsPromise('es-AR')

    const RenderedLayout = await LocaleLayout({
      children: <TestComponent />,
      params,
    })

    render(RenderedLayout)

    const container = screen.getByTestId('test-content').parentElement
    expect(container).toHaveAttribute('lang', 'es-AR')
    expect(screen.getByTestId('test-content')).toBeInTheDocument()
    expect(mockNotFound).not.toHaveBeenCalled()
  })

  it('should render children with correct lang attribute for valid Portuguese locale', async () => {
    const TestComponent = () => (
      <div data-testid="test-content">Conteúdo de teste</div>
    )

    const params = createParamsPromise('pt-BR')

    const RenderedLayout = await LocaleLayout({
      children: <TestComponent />,
      params,
    })

    render(RenderedLayout)

    const container = screen.getByTestId('test-content').parentElement
    expect(container).toHaveAttribute('lang', 'pt-BR')
    expect(screen.getByTestId('test-content')).toBeInTheDocument()
    expect(mockNotFound).not.toHaveBeenCalled()
  })

  it('should call notFound for invalid locale', async () => {
    const TestComponent = () => (
      <div data-testid="test-content">Test content</div>
    )

    const params = createParamsPromise('fr-FR') // Invalid locale

    await LocaleLayout({
      children: <TestComponent />,
      params,
    })

    expect(mockNotFound).toHaveBeenCalledTimes(1)
  })

  it('should call notFound for completely invalid locale string', async () => {
    const TestComponent = () => (
      <div data-testid="test-content">Test content</div>
    )

    const params = createParamsPromise('invalid-locale')

    await LocaleLayout({
      children: <TestComponent />,
      params,
    })

    expect(mockNotFound).toHaveBeenCalledTimes(1)
  })

  it('should call notFound for empty locale string', async () => {
    const TestComponent = () => (
      <div data-testid="test-content">Test content</div>
    )

    const params = createParamsPromise('')

    await LocaleLayout({
      children: <TestComponent />,
      params,
    })

    expect(mockNotFound).toHaveBeenCalledTimes(1)
  })

  it('should render multiple children correctly', async () => {
    const MultipleChildren = () => (
      <>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
        <span data-testid="child-3">Child 3</span>
      </>
    )

    const params = createParamsPromise('en-US')

    const RenderedLayout = await LocaleLayout({
      children: <MultipleChildren />,
      params,
    })

    render(RenderedLayout)

    expect(screen.getByTestId('child-1')).toBeInTheDocument()
    expect(screen.getByTestId('child-2')).toBeInTheDocument()
    expect(screen.getByTestId('child-3')).toBeInTheDocument()

    const container = screen.getByTestId('child-1').parentElement
    expect(container).toHaveAttribute('lang', 'en-US')
  })

  it('should handle complex children structures', async () => {
    const ComplexChildren = () => (
      <main>
        <header data-testid="header">Header</header>
        <section data-testid="content">
          <article data-testid="article">Article content</article>
        </section>
        <footer data-testid="footer">Footer</footer>
      </main>
    )

    const params = createParamsPromise('pt-BR')

    const RenderedLayout = await LocaleLayout({
      children: <ComplexChildren />,
      params,
    })

    render(RenderedLayout)

    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('content')).toBeInTheDocument()
    expect(screen.getByTestId('article')).toBeInTheDocument()
    expect(screen.getByTestId('footer')).toBeInTheDocument()

    const container = screen.getByRole('main').parentElement
    expect(container).toHaveAttribute('lang', 'pt-BR')
  })
})

describe('generateStaticParams', () => {
  it('should return all supported locales', async () => {
    const result = await generateStaticParams()

    expect(result).toEqual([
      { locale: 'en-US' },
      { locale: 'es-AR' },
      { locale: 'pt-BR' },
    ])
  })

  it('should return an array with correct length', async () => {
    const result = await generateStaticParams()

    expect(Array.isArray(result)).toBe(true)
    expect(result).toHaveLength(3)
  })

  it('should return objects with locale property', async () => {
    const result = await generateStaticParams()

    result.forEach((item) => {
      expect(item).toHaveProperty('locale')
      expect(typeof item.locale).toBe('string')
    })
  })

  it('should return consistent results on multiple calls', async () => {
    const result1 = await generateStaticParams()
    const result2 = await generateStaticParams()

    expect(result1).toEqual(result2)
  })
})
