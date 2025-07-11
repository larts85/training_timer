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

  it('renders a heading with English locale', async () => {
    const params = Promise.resolve({ locale: 'en-US' })

    // Since HomePage is now async, we need to render it properly
    const HomePageComponent = await HomePage({ params })

    render(HomePageComponent)

    // Fast-forward through the splash screen timer
    act(() => {
      jest.advanceTimersByTime(2000)
    })

    await waitFor(() => {
      const heading = screen.getByRole('heading', {
        name: /Hello world/i,
      })
      expect(heading).toBeInTheDocument()
    })
  })

  it('renders a heading with Spanish locale', async () => {
    const params = Promise.resolve({ locale: 'es-AR' })

    const HomePageComponent = await HomePage({ params })

    render(HomePageComponent)

    // Fast-forward through the splash screen timer
    act(() => {
      jest.advanceTimersByTime(2000)
    })

    await waitFor(() => {
      const heading = screen.getByRole('heading', {
        name: /hola mundo/i,
      })
      expect(heading).toBeInTheDocument()
    })
  })
})
