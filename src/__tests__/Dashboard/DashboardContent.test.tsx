import { render, screen } from '@testing-library/react'
import { DashboardContent } from '../../components/Dashboard/DashboardContent'
import { TimerState, TimerSettings } from '../../types/dashboard.types'

// Mock all child components
jest.mock('../../components/Dashboard/TimerDisplay', () => ({
  TimerDisplay: ({ timerState }: { timerState: TimerState }) => (
    <div data-testid="timer-display">
      TimerDisplay({timerState.isPlaying ? 'playing' : 'paused'})
    </div>
  ),
}))

jest.mock('../../components/Dashboard/TimerActions', () => ({
  TimerActions: ({
    isPlaying,
    onPlayPause,
    onStop,
    onNext,
    onPrevious,
  }: {
    isPlaying: boolean
    onPlayPause: () => void
    onStop: () => void
    onNext: () => void
    onPrevious: () => void
  }) => (
    <div data-testid="timer-actions">
      TimerActions(isPlaying: {isPlaying.toString()})
      <button onClick={onPlayPause}>Play/Pause</button>
      <button onClick={onStop}>Stop</button>
      <button onClick={onNext}>Next</button>
      <button onClick={onPrevious}>Previous</button>
    </div>
  ),
}))

jest.mock('../../components/Dashboard/TimerControllers', () => ({
  TimerControllers: ({
    settings,
    onSettingsChange,
  }: {
    settings: TimerSettings
    onSettingsChange: (
      key: keyof TimerSettings,
      value: string | number | boolean,
    ) => void
  }) => (
    <div data-testid="timer-controllers">
      TimerControllers(sets: {settings.sets})
      <button onClick={() => onSettingsChange('sets', 10)}>
        Change Settings
      </button>
    </div>
  ),
}))

jest.mock('../../components/Dashboard/DoneButton', () => ({
  DoneButton: ({ onClick }: { onClick: () => void }) => (
    <div data-testid="done-button">
      DoneButton
      <button onClick={onClick}>Done</button>
    </div>
  ),
}))

type ViewType = 'timer' | 'timerSettings' | 'generalSettings' | 'about'

describe('DashboardContent', () => {
  const mockTimerState: TimerState = {
    isPlaying: false,
    isPaused: false,
    currentTime: '30',
    totalTime: '300',
    currentCycle: 1,
    totalCycles: 3,
    currentSet: 1,
    totalSets: 3,
    phase: 'work',
  }

  const mockTimerSettings: TimerSettings = {
    prepare: '10',
    warmUp: '30',
    work: '45',
    rest: '15',
    sets: 3,
    cycles: 3,
    cycleRest: '90',
    workReps: true,
    restReps: false,
  }

  const defaultProps = {
    timerState: mockTimerState,
    timerSettings: mockTimerSettings,
    onPlayPause: jest.fn(),
    onStop: jest.fn(),
    onNext: jest.fn(),
    onPrevious: jest.fn(),
    onSettingsChange: jest.fn(),
    onDone: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render timer view with TimerDisplay and TimerActions', () => {
    render(<DashboardContent {...defaultProps} currentView="timer" />)

    expect(screen.getByTestId('timer-display')).toBeInTheDocument()
    expect(screen.getByTestId('timer-actions')).toBeInTheDocument()
    expect(screen.getByText('TimerDisplay(paused)')).toBeInTheDocument()
    expect(
      screen.getByText('TimerActions(isPlaying: false)'),
    ).toBeInTheDocument()
  })

  it('should render timer view with playing state', () => {
    const playingTimerState = { ...mockTimerState, isPlaying: true }

    render(
      <DashboardContent
        {...defaultProps}
        currentView="timer"
        timerState={playingTimerState}
      />,
    )

    expect(screen.getByText('TimerDisplay(playing)')).toBeInTheDocument()
    expect(
      screen.getByText('TimerActions(isPlaying: true)'),
    ).toBeInTheDocument()
  })

  it('should render timerSettings view with TimerControllers and DoneButton', () => {
    render(<DashboardContent {...defaultProps} currentView="timerSettings" />)

    expect(screen.getByTestId('timer-controllers')).toBeInTheDocument()
    expect(screen.getByTestId('done-button')).toBeInTheDocument()
    expect(screen.getByText('TimerControllers(sets: 3)')).toBeInTheDocument()
    expect(screen.getByText('DoneButton')).toBeInTheDocument()
  })

  it('should render generalSettings view with settings form and DoneButton', () => {
    render(<DashboardContent {...defaultProps} currentView="generalSettings" />)

    expect(screen.getByTestId('done-button')).toBeInTheDocument()
    expect(screen.getByText('DoneButton')).toBeInTheDocument()

    // Check general settings content
    expect(screen.getByText('Sounds')).toBeInTheDocument()
    expect(screen.getByText('Volume')).toBeInTheDocument()
    expect(screen.getByText('Vibrate')).toBeInTheDocument()
    expect(screen.getByText('Ending Bips')).toBeInTheDocument()

    expect(screen.getByText('Speaking Coach')).toBeInTheDocument()
    expect(screen.getByText('Ending Count')).toBeInTheDocument()
    expect(screen.getByText('Pausing sesion')).toBeInTheDocument()

    // Check form controls
    expect(screen.getByRole('slider')).toBeInTheDocument()
    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes).toHaveLength(4)
  })

  it('should render about view with version and description', () => {
    render(<DashboardContent {...defaultProps} currentView="about" />)

    expect(screen.getByText('About Training Timer')).toBeInTheDocument()
    expect(screen.getByText('Version 1.0.0')).toBeInTheDocument()
    expect(
      screen.getByText(
        'A simple and effective training timer for your workouts.',
      ),
    ).toBeInTheDocument()

    // Should not render other components
    expect(screen.queryByTestId('timer-display')).not.toBeInTheDocument()
    expect(screen.queryByTestId('timer-actions')).not.toBeInTheDocument()
    expect(screen.queryByTestId('timer-controllers')).not.toBeInTheDocument()
    expect(screen.queryByTestId('done-button')).not.toBeInTheDocument()
  })

  it('should render null for invalid view type', () => {
    const { container } = render(
      <DashboardContent
        {...defaultProps}
        currentView={'invalid' as ViewType}
      />,
    )

    expect(container.firstChild).toBeNull()
  })

  it('should not render TimerDisplay in non-timer views', () => {
    render(<DashboardContent {...defaultProps} currentView="timerSettings" />)
    expect(screen.queryByTestId('timer-display')).not.toBeInTheDocument()

    render(<DashboardContent {...defaultProps} currentView="generalSettings" />)
    expect(screen.queryByTestId('timer-display')).not.toBeInTheDocument()

    render(<DashboardContent {...defaultProps} currentView="about" />)
    expect(screen.queryByTestId('timer-display')).not.toBeInTheDocument()
  })

  it('should not render TimerActions in non-timer views', () => {
    render(<DashboardContent {...defaultProps} currentView="timerSettings" />)
    expect(screen.queryByTestId('timer-actions')).not.toBeInTheDocument()

    render(<DashboardContent {...defaultProps} currentView="generalSettings" />)
    expect(screen.queryByTestId('timer-actions')).not.toBeInTheDocument()

    render(<DashboardContent {...defaultProps} currentView="about" />)
    expect(screen.queryByTestId('timer-actions')).not.toBeInTheDocument()
  })

  it('should have correct CSS classes for generalSettings', () => {
    render(<DashboardContent {...defaultProps} currentView="generalSettings" />)

    expect(document.querySelector('.general-settings')).toBeInTheDocument()
    expect(
      document.querySelector('.general-settings-content'),
    ).toBeInTheDocument()
    expect(document.querySelectorAll('.settings-section')).toHaveLength(2)
    expect(document.querySelectorAll('.setting-row')).toHaveLength(5)
    expect(document.querySelector('.volume-slider')).toBeInTheDocument()
  })

  it('should have correct CSS classes for about view', () => {
    render(<DashboardContent {...defaultProps} currentView="about" />)

    expect(document.querySelector('.about-content')).toBeInTheDocument()
  })

  it('should render with different timer settings', () => {
    const customSettings: TimerSettings = {
      prepare: '15',
      warmUp: '60',
      work: '60',
      rest: '20',
      sets: 5,
      cycles: 4,
      cycleRest: '120',
      workReps: false,
      restReps: true,
    }

    render(
      <DashboardContent
        {...defaultProps}
        currentView="timerSettings"
        timerSettings={customSettings}
      />,
    )

    expect(screen.getByText('TimerControllers(sets: 5)')).toBeInTheDocument()
  })

  it('should handle different timer states correctly', () => {
    const finishedTimerState: TimerState = {
      isPlaying: false,
      isPaused: true,
      currentTime: '0',
      totalTime: '300',
      currentCycle: 3,
      totalCycles: 3,
      currentSet: 3,
      totalSets: 3,
      phase: 'rest',
    }

    render(
      <DashboardContent
        {...defaultProps}
        currentView="timer"
        timerState={finishedTimerState}
      />,
    )

    expect(screen.getByTestId('timer-display')).toBeInTheDocument()
    expect(screen.getByTestId('timer-actions')).toBeInTheDocument()
  })
})
