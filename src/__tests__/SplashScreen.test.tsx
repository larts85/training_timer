import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import SplashScreen from '../components/SplashScreen/SplashScreen'

describe('SplashScreen Component', () => {
  it('should render with default props', () => {
    render(<SplashScreen />)

    expect(screen.getByText('Training Timer')).toBeInTheDocument()
    expect(screen.getByText('Get ready to train!')).toBeInTheDocument()
  })

  it('should render when visible', () => {
    render(<SplashScreen isVisible={true} />)

    const splashScreen = screen.getByText('Training Timer').closest('div')
    expect(splashScreen).toBeInTheDocument()
  })

  it('should not render when not visible', () => {
    render(<SplashScreen isVisible={false} />)

    expect(screen.queryByText('Training Timer')).not.toBeInTheDocument()
  })

  it('should call onAnimationEnd when animation ends', () => {
    const mockOnAnimationEnd = jest.fn()
    render(<SplashScreen onAnimationEnd={mockOnAnimationEnd} />)

    const splashScreen = screen.getByText('Training Timer').closest('div')
    if (splashScreen?.parentElement) {
      fireEvent.animationEnd(splashScreen.parentElement)
    }

    expect(mockOnAnimationEnd).toHaveBeenCalledTimes(1)
  })

  it('should not call onAnimationEnd when callback is not provided', () => {
    expect(() => {
      render(<SplashScreen />)
      const splashScreen = screen.getByText('Training Timer').closest('div')
      if (splashScreen?.parentElement) {
        fireEvent.animationEnd(splashScreen.parentElement)
      }
    }).not.toThrow()
  })

  it('should apply custom className', () => {
    const customClass = 'custom-splash-class'
    render(<SplashScreen className={customClass} />)

    const splashScreen = screen.getByText('Training Timer').closest('div')
    expect(splashScreen?.parentElement).toHaveClass(customClass)
  })

  it('should have proper structure and styling', () => {
    render(<SplashScreen />)

    const splashScreen = screen.getByText('Training Timer').closest('div')
    expect(splashScreen?.parentElement).toHaveClass(
      'fixed',
      'inset-0',
      'z-50',
      'flex',
      'items-center',
      'justify-center',
      'bg-gradient-to-br',
      'from-blue-500',
      'to-purple-600',
    )
  })

  it('should render animated elements', () => {
    const { container } = render(<SplashScreen />)

    const animatedElements = container.querySelectorAll('.animate-pulse')
    expect(animatedElements.length).toBeGreaterThan(0)

    const pingElement = container.querySelector('.animate-ping')
    expect(pingElement).toBeInTheDocument()
  })

  it('should render SVG icon', () => {
    const { container } = render(<SplashScreen />)

    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveClass('w-10', 'h-10', 'text-blue-600')
  })

  it('should have correct text styling', () => {
    render(<SplashScreen />)

    const title = screen.getByText('Training Timer')
    const subtitle = screen.getByText('Get ready to train!')

    expect(title).toHaveClass('text-3xl', 'font-bold', 'text-white', 'mb-2')
    expect(subtitle).toHaveClass('text-white/80', 'text-lg')
  })

  it('should render progress bar', () => {
    const { container } = render(<SplashScreen />)

    const progressContainer = container.querySelector('.w-32.h-1.bg-white\\/30')
    expect(progressContainer).toBeInTheDocument()

    const progressBar = container.querySelector(
      '.h-full.bg-white.rounded-full.animate-pulse',
    )
    expect(progressBar).toBeInTheDocument()
  })

  it('should have correct icon container structure', () => {
    const { container } = render(<SplashScreen />)

    const iconContainer = container.querySelector('.relative.w-20.h-20')
    expect(iconContainer).toBeInTheDocument()

    const pingRing = container.querySelector(
      '.absolute.inset-0.rounded-full.bg-white\\/20.animate-ping',
    )
    expect(pingRing).toBeInTheDocument()

    const iconBackground = container.querySelector(
      '.relative.w-full.h-full.rounded-full.bg-white.flex.items-center.justify-center',
    )
    expect(iconBackground).toBeInTheDocument()
  })

  it('should have correct displayName', () => {
    expect(SplashScreen.displayName).toBe('SplashScreen')
  })

  it('should render with proper z-index for overlay', () => {
    render(<SplashScreen />)

    const splashScreen = screen.getByText('Training Timer').closest('div')
    expect(splashScreen?.parentElement).toHaveClass('z-50')
  })

  it('should be positioned fixed to cover entire screen', () => {
    render(<SplashScreen />)

    const splashScreen = screen.getByText('Training Timer').closest('div')
    expect(splashScreen?.parentElement).toHaveClass('fixed', 'inset-0')
  })
})
