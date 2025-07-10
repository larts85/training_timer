import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Timer from '../components/Timer/Timer'

// Mock the useTranslations hook
jest.mock('@/hooks/useTranslations', () => {
  return jest.fn(() => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'dashboard.title': 'Training Timer',
        'controllers.start': 'Start',
        'controllers.pause': 'Pause',
        'timer.cycles': 'Cycles',
      }
      return translations[key] || key
    },
  }))
})

describe('Timer Component', () => {
  it('should render with default props', () => {
    render(<Timer />)

    expect(screen.getByText('Training Timer')).toBeInTheDocument()
    expect(screen.getByText('00:00:00')).toBeInTheDocument()
    expect(screen.getByText('Start')).toBeInTheDocument()
    expect(screen.getByText('Pause')).toBeInTheDocument()
    expect(screen.getByText('Cycles: 0')).toBeInTheDocument()
  })

  it('should render with light color mode', () => {
    const { container } = render(<Timer colorMode="light" />)

    const timerDiv = container.firstChild as HTMLElement
    expect(timerDiv).toHaveClass('bg-white', 'text-gray-900')
  })

  it('should render with dark color mode', () => {
    const { container } = render(<Timer colorMode="dark" />)

    const timerDiv = container.firstChild as HTMLElement
    expect(timerDiv).toHaveClass('bg-gray-900', 'text-white')
  })

  it('should render with rounded corners', () => {
    const { container } = render(<Timer cornerMode="rounded" />)

    const timerDiv = container.firstChild as HTMLElement
    expect(timerDiv).toHaveClass('rounded-lg')
  })

  it('should render with square corners', () => {
    const { container } = render(<Timer cornerMode="square" />)

    const timerDiv = container.firstChild as HTMLElement
    expect(timerDiv).toHaveClass('rounded-none')
  })

  it('should apply custom className', () => {
    const customClass = 'custom-timer-class'
    const { container } = render(<Timer className={customClass} />)

    const timerDiv = container.firstChild as HTMLElement
    expect(timerDiv).toHaveClass(customClass)
  })

  it('should have proper accessibility attributes', () => {
    render(<Timer />)

    const startButton = screen.getByRole('button', { name: 'Start' })
    const pauseButton = screen.getByRole('button', { name: 'Pause' })

    expect(startButton).toHaveAttribute('aria-label', 'Start')
    expect(pauseButton).toHaveAttribute('aria-label', 'Pause')
  })

  it('should have proper button styling', () => {
    render(<Timer />)

    const startButton = screen.getByText('Start')
    const pauseButton = screen.getByText('Pause')

    expect(startButton).toHaveClass('bg-green-500', 'hover:bg-green-600')
    expect(pauseButton).toHaveClass('bg-red-500', 'hover:bg-red-600')
  })

  it('should display timer in correct format', () => {
    render(<Timer />)

    const timerDisplay = screen.getByText('00:00:00')
    expect(timerDisplay).toHaveClass('text-6xl', 'font-mono', 'font-bold')
  })

  it('should have correct displayName', () => {
    expect(Timer.displayName).toBe('Timer')
  })
})
