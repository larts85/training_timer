import { render, screen, waitFor, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import HomePage from '../app/[locale]/page'

// Mock timers to avoid waiting for SplashScreen
jest.useFakeTimers()

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/es-AR',
  useParams: jest.fn().mockReturnValue({ locale: 'es-AR' }),
}))

// Mock the translations utility
jest.mock('@/utils/translations', () => ({
  getTranslations: jest.fn().mockImplementation((locale: string) => {
    const translations = {
      'en-US': {
        home: {
          pageTitle: 'Test Title',
          metaDescription: 'Test Description',
          greeting: 'Hello world',
        },
      },
      'es-AR': {
        home: {
          pageTitle: 'Título de Prueba',
          metaDescription: 'Descripción de Prueba',
          greeting: 'Hola mundo',
        },
      },
    }
    return Promise.resolve(translations[locale as keyof typeof translations])
  }),
  getStaticTranslations: jest.fn().mockReturnValue({
    navLinks: {
      home: 'Home',
      anchorTitle: 'Anchor Title',
    },
  }),
}))

describe('HomePage', () => {
  beforeEach(() => {
    jest.clearAllTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
  })

  it('renders the Training Timer Dashboard', async () => {
    render(<HomePage />)

    // Fast-forward through the splash screen timer
    act(() => {
      jest.advanceTimersByTime(2000)
    })

    await waitFor(() => {
      const heading = screen.getByRole('heading', {
        name: /Training Timer/i,
      })
      expect(heading).toBeInTheDocument()
    })

    // Verify Dashboard elements are present
    expect(screen.getByText('Timer')).toBeInTheDocument()
    expect(screen.getByText('SETS')).toBeInTheDocument()
    expect(screen.getByText('CYCLES')).toBeInTheDocument()
  })

  it('renders the Training Timer Dashboard consistently', async () => {
    render(<HomePage />)

    // Fast-forward through the splash screen timer
    act(() => {
      jest.advanceTimersByTime(2000)
    })

    await waitFor(() => {
      const heading = screen.getByRole('heading', {
        name: /Training Timer/i,
      })
      expect(heading).toBeInTheDocument()
    })

    // Verify Dashboard elements are present
    expect(screen.getByText('Timer')).toBeInTheDocument()
    expect(screen.getByText('SETS')).toBeInTheDocument()
    expect(screen.getByText('CYCLES')).toBeInTheDocument()
  })
})
