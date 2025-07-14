import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Dashboard } from '@/components/Dashboard/Dashboard'

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function MockImage({
    src,
    alt,
    width,
    height,
  }: {
    src: string
    alt: string
    width: number
    height: number
  }) {
    return <img src={src} alt={alt} width={width} height={height} />
  }
})

// Mock child components with simpler implementations
jest.mock('@/components/Dashboard/DashboardContent', () => ({
  DashboardContent: jest.fn(
    ({
      currentView,
      timerState,
      onPlayPause,
      onStop,
      onNext,
      onPrevious,
      onSettingsChange,
      onDone,
    }) => (
      <div data-testid="dashboard-content">
        <div data-testid="current-view">{currentView}</div>
        <div data-testid="timer-phase">{timerState.phase}</div>
        <div data-testid="timer-playing">{timerState.isPlaying.toString()}</div>
        <button data-testid="mock-play-pause" onClick={onPlayPause}>
          Play/Pause
        </button>
        <button data-testid="mock-stop" onClick={onStop}>
          Stop
        </button>
        <button data-testid="mock-next" onClick={onNext}>
          Next
        </button>
        <button data-testid="mock-previous" onClick={onPrevious}>
          Previous
        </button>
        <button
          data-testid="mock-settings-change"
          onClick={() => onSettingsChange('work', '01:00')}
        >
          Change Settings
        </button>
        <button data-testid="mock-done" onClick={onDone}>
          Done
        </button>
      </div>
    ),
  ),
}))

jest.mock('@/components/Dashboard/TimerMenu', () => ({
  TimerMenu: jest.fn(({ activeItem, onItemClick, onClose }) => (
    <div data-testid="timer-menu">
      <div data-testid="active-item">{activeItem}</div>
      <button data-testid="select-timer" onClick={() => onItemClick('timer')}>
        Timer
      </button>
      <button
        data-testid="select-timer-settings"
        onClick={() => onItemClick('timerSettings')}
      >
        Timer Settings
      </button>
      <button
        data-testid="select-general-settings"
        onClick={() => onItemClick('generalSettings')}
      >
        General Settings
      </button>
      <button data-testid="select-about" onClick={() => onItemClick('about')}>
        About
      </button>
      <button data-testid="close-menu" onClick={onClose}>
        Close
      </button>
    </div>
  )),
}))

jest.mock('@/components/Dashboard/Message', () => ({
  Message: jest.fn(({ text, onClose }) => (
    <div data-testid="message">
      <div data-testid="message-text">{text}</div>
      <button data-testid="close-message" onClick={onClose}>
        Close
      </button>
    </div>
  )),
}))

// Mock CSS import
jest.mock('@/styles/dashboard.css', () => ({}))

describe('Dashboard', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
  })

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers()
    })
    jest.useRealTimers()
  })

  it('should render dashboard with initial state', () => {
    render(<Dashboard />)

    expect(screen.getByTestId('dashboard-content')).toBeInTheDocument()
    expect(screen.getByTestId('current-view')).toHaveTextContent('timer')
    expect(screen.getByTestId('timer-phase')).toHaveTextContent('prepare')
    expect(screen.getByTestId('timer-playing')).toHaveTextContent('false')
  })

  it('should render page title', () => {
    render(<Dashboard />)

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(screen.getByText('Timer')).toBeInTheDocument()
  })

  it('should handle play/pause functionality through DashboardContent', () => {
    render(<Dashboard />)

    const playPauseButton = screen.getByTestId('mock-play-pause')

    // Initially not playing
    expect(screen.getByTestId('timer-playing')).toHaveTextContent('false')

    // Click play/pause
    fireEvent.click(playPauseButton)
    expect(screen.getByTestId('timer-playing')).toHaveTextContent('true')

    // Click play/pause again (should pause)
    fireEvent.click(playPauseButton)
    expect(screen.getByTestId('timer-playing')).toHaveTextContent('false')
  })

  it('should handle stop functionality', () => {
    render(<Dashboard />)

    // First start the timer
    const playPauseButton = screen.getByTestId('mock-play-pause')
    fireEvent.click(playPauseButton)
    expect(screen.getByTestId('timer-playing')).toHaveTextContent('true')

    // Then stop it
    const stopButton = screen.getByTestId('mock-stop')
    fireEvent.click(stopButton)

    expect(screen.getByTestId('timer-playing')).toHaveTextContent('false')
    expect(screen.getByTestId('timer-phase')).toHaveTextContent('prepare')
  })

  it('should handle next and previous functionality', () => {
    render(<Dashboard />)

    const nextButton = screen.getByTestId('mock-next')
    const previousButton = screen.getByTestId('mock-previous')

    fireEvent.click(nextButton)
    expect(screen.getByTestId('dashboard-content')).toBeInTheDocument()

    fireEvent.click(previousButton)
    expect(screen.getByTestId('dashboard-content')).toBeInTheDocument()
  })

  it('should handle footer navigation', () => {
    render(<Dashboard />)

    // Find footer buttons by their alt text
    const timerButton = screen.getByAltText('Timer').closest('button')
    const timerSettingsButton = screen
      .getByAltText('Timer Settings')
      .closest('button')
    const generalSettingsButton = screen
      .getByAltText('General Settings')
      .closest('button')
    const aboutButton = screen.getByAltText('About').closest('button')

    expect(timerButton).toBeInTheDocument()
    expect(timerSettingsButton).toBeInTheDocument()
    expect(generalSettingsButton).toBeInTheDocument()
    expect(aboutButton).toBeInTheDocument()

    // Test navigation to timer settings
    fireEvent.click(timerSettingsButton!)
    expect(screen.getByTestId('current-view')).toHaveTextContent(
      'timerSettings',
    )

    // Test navigation to general settings
    fireEvent.click(generalSettingsButton!)
    expect(screen.getByTestId('current-view')).toHaveTextContent(
      'generalSettings',
    )

    // Test navigation to about
    fireEvent.click(aboutButton!)
    expect(screen.getByTestId('current-view')).toHaveTextContent('about')

    // Test navigation back to timer
    fireEvent.click(timerButton!)
    expect(screen.getByTestId('current-view')).toHaveTextContent('timer')
  })

  it('should handle menu toggle', () => {
    render(<Dashboard />)

    // Find menu button by its image alt text
    const menuButton = screen.getByAltText('Menu').closest('button')
    expect(menuButton).toBeInTheDocument()

    // Initially menu should not be visible
    expect(screen.queryByTestId('timer-menu')).not.toBeInTheDocument()

    // Click to open menu
    fireEvent.click(menuButton!)
    expect(screen.getByTestId('timer-menu')).toBeInTheDocument()

    // Close menu using close button
    const closeButton = screen.getByTestId('close-menu')
    fireEvent.click(closeButton)
    expect(screen.queryByTestId('timer-menu')).not.toBeInTheDocument()
  })

  it('should handle view changes through timer menu', () => {
    render(<Dashboard />)

    // Open menu
    const menuButton = screen.getByAltText('Menu').closest('button')
    fireEvent.click(menuButton!)

    // Change to timer settings view
    const timerSettingsButton = screen.getByTestId('select-timer-settings')
    fireEvent.click(timerSettingsButton)

    expect(screen.getByTestId('current-view')).toHaveTextContent(
      'timerSettings',
    )
    expect(screen.queryByTestId('timer-menu')).not.toBeInTheDocument() // Menu should close
  })

  it('should handle settings changes', () => {
    render(<Dashboard />)

    const settingsChangeButton = screen.getByTestId('mock-settings-change')
    fireEvent.click(settingsChangeButton)

    // Should update settings and component should still be rendered
    expect(screen.getByTestId('dashboard-content')).toBeInTheDocument()
  })

  it('should handle done functionality', () => {
    render(<Dashboard />)

    // First change to timer settings view
    const timerSettingsButton = screen
      .getByAltText('Timer Settings')
      .closest('button')
    fireEvent.click(timerSettingsButton!)
    expect(screen.getByTestId('current-view')).toHaveTextContent(
      'timerSettings',
    )

    // Then click done
    const doneButton = screen.getByTestId('mock-done')
    fireEvent.click(doneButton)

    // Should return to timer view
    expect(screen.getByTestId('current-view')).toHaveTextContent('timer')
  })

  it('should not show message initially', () => {
    render(<Dashboard />)

    // Message should not be visible initially
    expect(screen.queryByTestId('message')).not.toBeInTheDocument()
  })

  it('should render all required footer icons', () => {
    render(<Dashboard />)

    expect(screen.getByAltText('Timer')).toBeInTheDocument()
    expect(screen.getByAltText('Timer Settings')).toBeInTheDocument()
    expect(screen.getByAltText('General Settings')).toBeInTheDocument()
    expect(screen.getByAltText('About')).toBeInTheDocument()
  })

  it('should apply active class to current view footer button', () => {
    render(<Dashboard />)

    const timerButton = screen.getByAltText('Timer').closest('button')
    expect(timerButton).toHaveClass('active')

    // Change view and check active class changes
    const aboutButton = screen.getByAltText('About').closest('button')
    fireEvent.click(aboutButton!)

    expect(aboutButton).toHaveClass('active')
    expect(timerButton).not.toHaveClass('active')
  })

  it('should update timer when playing', async () => {
    render(<Dashboard />)

    const playPauseButton = screen.getByTestId('mock-play-pause')
    fireEvent.click(playPauseButton)

    expect(screen.getByTestId('timer-playing')).toHaveTextContent('true')

    // Advance timers to test interval behavior
    act(() => {
      jest.advanceTimersByTime(1000)
    })

    // Timer should still be playing
    expect(screen.getByTestId('timer-playing')).toHaveTextContent('true')
  })
})
