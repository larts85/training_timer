import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import AppClient from '../components/App/AppClient'

// Mock child components
jest.mock('../components/Header/Header', () => {
  return function MockHeader({ locale }: { locale: string }) {
    return <header data-testid="header">Header({locale})</header>
  }
})

jest.mock('../components/Footer/Footer', () => {
  return function MockFooter({ isMobile }: { isMobile: boolean }) {
    return (
      <footer data-testid="footer">
        Footer(isMobile: {isMobile.toString()})
      </footer>
    )
  }
})

jest.mock('../components/Timer/Timer', () => {
  return function MockTimer() {
    return <div data-testid="timer">Timer Component</div>
  }
})

jest.mock('../components/SplashScreen/SplashScreen', () => {
  return function MockSplashScreen({
    onAnimationEnd,
  }: {
    onAnimationEnd: () => void
  }) {
    return (
      <div data-testid="splash-screen" onClick={onAnimationEnd}>
        SplashScreen Component
      </div>
    )
  }
})

// Mock window.innerWidth
Object.defineProperty(window, 'innerWidth', {
  writable: true,
  configurable: true,
  value: 1024,
})

// Mock timers
jest.useFakeTimers()

const defaultProps = {
  locale: 'en',
  greeting: 'Welcome to Training Timer',
}

describe('AppClient Component', () => {
  beforeEach(() => {
    jest.clearAllTimers()
    jest.clearAllMocks()
    window.innerWidth = 1024
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
    jest.useFakeTimers()
  })

  it('should initially render SplashScreen', () => {
    render(<AppClient {...defaultProps} />)

    expect(screen.getByTestId('splash-screen')).toBeInTheDocument()
    expect(screen.queryByTestId('header')).not.toBeInTheDocument()
    expect(screen.queryByTestId('timer')).not.toBeInTheDocument()
    expect(screen.queryByTestId('footer')).not.toBeInTheDocument()
  })

  it('should hide splash screen after 2 seconds', async () => {
    render(<AppClient {...defaultProps} />)

    // Initially splash is shown
    expect(screen.getByTestId('splash-screen')).toBeInTheDocument()

    // Fast-forward time by 2 seconds
    act(() => {
      jest.advanceTimersByTime(2000)
    })

    // Wait for state update
    await waitFor(() => {
      expect(screen.queryByTestId('splash-screen')).not.toBeInTheDocument()
    })

    // Main app should now be rendered
    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('timer')).toBeInTheDocument()
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })

  it('should hide splash screen when onAnimationEnd is called', async () => {
    render(<AppClient {...defaultProps} />)

    // Initially splash is shown
    expect(screen.getByTestId('splash-screen')).toBeInTheDocument()

    // Click on splash screen to trigger onAnimationEnd
    fireEvent.click(screen.getByTestId('splash-screen'))

    // Wait for state update
    await waitFor(() => {
      expect(screen.queryByTestId('splash-screen')).not.toBeInTheDocument()
    })

    // Main app should now be rendered
    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('timer')).toBeInTheDocument()
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })

  it('should detect desktop initially (window width >= 768)', async () => {
    window.innerWidth = 1024

    render(<AppClient {...defaultProps} />)

    // Skip splash screen
    act(() => {
      jest.advanceTimersByTime(2000)
    })

    await waitFor(() => {
      const footer = screen.getByTestId('footer')
      expect(footer).toHaveTextContent('Footer(isMobile: false)')
    })
  })

  it('should detect mobile initially (window width < 768)', async () => {
    window.innerWidth = 600

    render(<AppClient {...defaultProps} />)

    // Skip splash screen
    act(() => {
      jest.advanceTimersByTime(2000)
    })

    await waitFor(() => {
      const footer = screen.getByTestId('footer')
      expect(footer).toHaveTextContent('Footer(isMobile: true)')
    })
  })

  it('should update isMobile state on window resize', async () => {
    window.innerWidth = 1024

    render(<AppClient {...defaultProps} />)

    // Skip splash screen
    act(() => {
      jest.advanceTimersByTime(2000)
    })

    await waitFor(() => {
      const footer = screen.getByTestId('footer')
      expect(footer).toHaveTextContent('Footer(isMobile: false)')
    })

    // Resize to mobile
    act(() => {
      window.innerWidth = 600
      fireEvent(window, new Event('resize'))
    })

    await waitFor(() => {
      const footer = screen.getByTestId('footer')
      expect(footer).toHaveTextContent('Footer(isMobile: true)')
    })

    // Resize back to desktop
    act(() => {
      window.innerWidth = 1024
      fireEvent(window, new Event('resize'))
    })

    await waitFor(() => {
      const footer = screen.getByTestId('footer')
      expect(footer).toHaveTextContent('Footer(isMobile: false)')
    })
  })

  it('should render main app with correct props and content', async () => {
    render(<AppClient locale="es" greeting="Bienvenido al Timer" />)

    // Skip splash screen
    act(() => {
      jest.advanceTimersByTime(2000)
    })

    await waitFor(() => {
      // Check Header receives correct locale
      expect(screen.getByTestId('header')).toHaveTextContent('Header(es)')

      // Check greeting is displayed
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Bienvenido al Timer',
      )

      // Check static content
      expect(screen.getByText('Training Timer App')).toBeInTheDocument()

      // Check Timer component is rendered
      expect(screen.getByTestId('timer')).toBeInTheDocument()
    })
  })

  it('should have correct CSS classes and structure', async () => {
    render(<AppClient {...defaultProps} />)

    // Skip splash screen
    act(() => {
      jest.advanceTimersByTime(2000)
    })

    await waitFor(() => {
      // Check main container
      const mainContainer = screen.getByRole('main')
      expect(mainContainer).toHaveClass(
        'flex-1',
        'flex',
        'items-center',
        'justify-center',
        'p-4',
      )

      // Check heading
      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveClass(
        'text-4xl',
        'font-bold',
        'text-gray-900',
        'dark:text-white',
        'mb-4',
      )
    })
  })

  it('should cleanup timer and event listener on unmount', () => {
    const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout')
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener')

    const { unmount } = render(<AppClient {...defaultProps} />)

    unmount()

    expect(clearTimeoutSpy).toHaveBeenCalled()
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'resize',
      expect.any(Function),
    )

    clearTimeoutSpy.mockRestore()
    removeEventListenerSpy.mockRestore()
  })

  it('should handle different locale and greeting combinations', async () => {
    render(<AppClient locale="pt" greeting="Bem-vindo ao Timer de Treino" />)

    // Skip splash screen
    act(() => {
      jest.advanceTimersByTime(2000)
    })

    await waitFor(() => {
      expect(screen.getByTestId('header')).toHaveTextContent('Header(pt)')
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Bem-vindo ao Timer de Treino',
      )
    })
  })

  it('should have correct displayName', () => {
    expect(AppClient.displayName).toBe('AppClient')
  })

  it('should handle edge case of exactly 768px width', async () => {
    window.innerWidth = 768

    render(<AppClient {...defaultProps} />)

    // Skip splash screen
    act(() => {
      jest.advanceTimersByTime(2000)
    })

    await waitFor(() => {
      const footer = screen.getByTestId('footer')
      // 768px should be considered desktop (not < 768)
      expect(footer).toHaveTextContent('Footer(isMobile: false)')
    })
  })
})
