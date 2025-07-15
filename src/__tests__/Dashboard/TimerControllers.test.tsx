import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { TimerControllers } from '@/components/Dashboard/TimerControllers'
import { TimerSettings } from '@/types/dashboard.types'

// Mock TimerControllerRow component
jest.mock('@/components/Dashboard/TimerControllerRow', () => ({
  TimerControllerRow: jest.fn(
    ({
      name,
      value,
      onValueChange,
      hasToggle,
      isToggleOn,
      onToggleChange,
      isNumberInput,
    }) => (
      <div data-testid={`controller-${name.toLowerCase().replace(' ', '-')}`}>
        <span data-testid="name">{name}</span>
        <span data-testid="value">{value}</span>
        <button
          data-testid="increment"
          onClick={() => {
            if (isNumberInput) {
              const numValue = parseInt(value) || 0
              onValueChange((numValue + 1).toString())
            } else {
              onValueChange(value)
            }
          }}
        >
          +
        </button>
        <button
          data-testid="decrement"
          onClick={() => {
            if (isNumberInput) {
              const numValue = parseInt(value) || 0
              if (numValue > 0) {
                onValueChange((numValue - 1).toString())
              }
            } else {
              onValueChange(value)
            }
          }}
        >
          -
        </button>
        {hasToggle && (
          <button
            data-testid="toggle"
            onClick={() => onToggleChange && onToggleChange(!isToggleOn)}
          >
            Toggle {isToggleOn ? 'ON' : 'OFF'}
          </button>
        )}
      </div>
    ),
  ),
}))

describe('TimerControllers', () => {
  const mockOnSettingsChange = jest.fn()

  const defaultSettings: TimerSettings = {
    prepare: '00:10',
    warmUp: '00:05',
    work: '00:20',
    rest: '00:10',
    sets: 3,
    cycles: 4,
    cycleRest: '01:00',
    workReps: false,
    restReps: false,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render all timer controller rows', () => {
    render(
      <TimerControllers
        settings={defaultSettings}
        onSettingsChange={mockOnSettingsChange}
      />,
    )

    expect(screen.getByTestId('controller-prepare')).toBeInTheDocument()
    expect(screen.getByTestId('controller-warm-up')).toBeInTheDocument()
    expect(screen.getByTestId('controller-work')).toBeInTheDocument()
    expect(screen.getByTestId('controller-rest')).toBeInTheDocument()
    expect(screen.getByTestId('controller-sets')).toBeInTheDocument()
    expect(screen.getByTestId('controller-cycles')).toBeInTheDocument()
    expect(screen.getByTestId('controller-cycle-rest')).toBeInTheDocument()
  })

  it('should display correct values for each controller', () => {
    render(
      <TimerControllers
        settings={defaultSettings}
        onSettingsChange={mockOnSettingsChange}
      />,
    )

    const prepareController = screen.getByTestId('controller-prepare')
    expect(prepareController).toHaveTextContent('Prepare')
    expect(prepareController).toHaveTextContent('00:10')

    const warmUpController = screen.getByTestId('controller-warm-up')
    expect(warmUpController).toHaveTextContent('Warm Up')
    expect(warmUpController).toHaveTextContent('00:05')

    const workController = screen.getByTestId('controller-work')
    expect(workController).toHaveTextContent('Work')
    expect(workController).toHaveTextContent('00:20')

    const restController = screen.getByTestId('controller-rest')
    expect(restController).toHaveTextContent('Rest')
    expect(restController).toHaveTextContent('00:10')

    const setsController = screen.getByTestId('controller-sets')
    expect(setsController).toHaveTextContent('Sets')
    expect(setsController).toHaveTextContent('3')

    const cyclesController = screen.getByTestId('controller-cycles')
    expect(cyclesController).toHaveTextContent('Cycles')
    expect(cyclesController).toHaveTextContent('4')

    const cycleRestController = screen.getByTestId('controller-cycle-rest')
    expect(cycleRestController).toHaveTextContent('Cycle Rest')
    expect(cycleRestController).toHaveTextContent('01:00')
  })

  it('should call onSettingsChange for prepare value change', () => {
    render(
      <TimerControllers
        settings={defaultSettings}
        onSettingsChange={mockOnSettingsChange}
      />,
    )

    const prepareController = screen.getByTestId('controller-prepare')
    const incrementButton = prepareController.querySelector(
      '[data-testid="increment"]',
    )

    fireEvent.click(incrementButton!)

    expect(mockOnSettingsChange).toHaveBeenCalledWith('prepare', '00:10')
  })

  it('should call onSettingsChange for warmUp value change', () => {
    render(
      <TimerControllers
        settings={defaultSettings}
        onSettingsChange={mockOnSettingsChange}
      />,
    )

    const warmUpController = screen.getByTestId('controller-warm-up')
    const incrementButton = warmUpController.querySelector(
      '[data-testid="increment"]',
    )

    fireEvent.click(incrementButton!)

    expect(mockOnSettingsChange).toHaveBeenCalledWith('warmUp', '00:05')
  })

  it('should call onSettingsChange for work value change', () => {
    render(
      <TimerControllers
        settings={defaultSettings}
        onSettingsChange={mockOnSettingsChange}
      />,
    )

    const workController = screen.getByTestId('controller-work')
    const incrementButton = workController.querySelector(
      '[data-testid="increment"]',
    )

    fireEvent.click(incrementButton!)

    expect(mockOnSettingsChange).toHaveBeenCalledWith('work', '00:20')
  })

  it('should call onSettingsChange for rest value change', () => {
    render(
      <TimerControllers
        settings={defaultSettings}
        onSettingsChange={mockOnSettingsChange}
      />,
    )

    const restController = screen.getByTestId('controller-rest')
    const incrementButton = restController.querySelector(
      '[data-testid="increment"]',
    )

    fireEvent.click(incrementButton!)

    expect(mockOnSettingsChange).toHaveBeenCalledWith('rest', '00:10')
  })

  it('should call onSettingsChange for sets value change with number parsing', () => {
    render(
      <TimerControllers
        settings={defaultSettings}
        onSettingsChange={mockOnSettingsChange}
      />,
    )

    const setsController = screen.getByTestId('controller-sets')
    const incrementButton = setsController.querySelector(
      '[data-testid="increment"]',
    )

    fireEvent.click(incrementButton!)

    expect(mockOnSettingsChange).toHaveBeenCalledWith('sets', 4)
  })

  it('should call onSettingsChange for cycles value change with number parsing', () => {
    render(
      <TimerControllers
        settings={defaultSettings}
        onSettingsChange={mockOnSettingsChange}
      />,
    )

    const cyclesController = screen.getByTestId('controller-cycles')
    const incrementButton = cyclesController.querySelector(
      '[data-testid="increment"]',
    )

    fireEvent.click(incrementButton!)

    expect(mockOnSettingsChange).toHaveBeenCalledWith('cycles', 5)
  })

  it('should call onSettingsChange for cycleRest value change', () => {
    render(
      <TimerControllers
        settings={defaultSettings}
        onSettingsChange={mockOnSettingsChange}
      />,
    )

    const cycleRestController = screen.getByTestId('controller-cycle-rest')
    const incrementButton = cycleRestController.querySelector(
      '[data-testid="increment"]',
    )

    fireEvent.click(incrementButton!)

    expect(mockOnSettingsChange).toHaveBeenCalledWith('cycleRest', '01:00')
  })

  it('should handle sets value change with invalid number (fallback to 0)', () => {
    const settingsWithInvalidSets = {
      ...defaultSettings,
      sets: NaN,
    }

    render(
      <TimerControllers
        settings={settingsWithInvalidSets}
        onSettingsChange={mockOnSettingsChange}
      />,
    )

    const setsController = screen.getByTestId('controller-sets')
    const incrementButton = setsController.querySelector(
      '[data-testid="increment"]',
    )

    fireEvent.click(incrementButton!)

    expect(mockOnSettingsChange).toHaveBeenCalledWith('sets', 1)
  })

  it('should handle cycles value change with invalid number (fallback to 0)', () => {
    const settingsWithInvalidCycles = {
      ...defaultSettings,
      cycles: NaN,
    }

    render(
      <TimerControllers
        settings={settingsWithInvalidCycles}
        onSettingsChange={mockOnSettingsChange}
      />,
    )

    const cyclesController = screen.getByTestId('controller-cycles')
    const incrementButton = cyclesController.querySelector(
      '[data-testid="increment"]',
    )

    fireEvent.click(incrementButton!)

    expect(mockOnSettingsChange).toHaveBeenCalledWith('cycles', 1)
  })

  it('should call onSettingsChange for work reps toggle change', () => {
    render(
      <TimerControllers
        settings={defaultSettings}
        onSettingsChange={mockOnSettingsChange}
      />,
    )

    const workController = screen.getByTestId('controller-work')
    const toggleButton = workController.querySelector('[data-testid="toggle"]')

    fireEvent.click(toggleButton!)

    expect(mockOnSettingsChange).toHaveBeenCalledWith('workReps', true)
  })

  it('should call onSettingsChange for rest reps toggle change', () => {
    render(
      <TimerControllers
        settings={defaultSettings}
        onSettingsChange={mockOnSettingsChange}
      />,
    )

    const restController = screen.getByTestId('controller-rest')
    const toggleButton = restController.querySelector('[data-testid="toggle"]')

    fireEvent.click(toggleButton!)

    expect(mockOnSettingsChange).toHaveBeenCalledWith('restReps', true)
  })

  it('should show toggle buttons for work and rest controllers only', () => {
    render(
      <TimerControllers
        settings={defaultSettings}
        onSettingsChange={mockOnSettingsChange}
      />,
    )

    // Work and Rest should have toggles
    expect(
      screen
        .getByTestId('controller-work')
        .querySelector('[data-testid="toggle"]'),
    ).toBeInTheDocument()
    expect(
      screen
        .getByTestId('controller-rest')
        .querySelector('[data-testid="toggle"]'),
    ).toBeInTheDocument()

    // Others should not have toggles
    expect(
      screen
        .getByTestId('controller-prepare')
        .querySelector('[data-testid="toggle"]'),
    ).not.toBeInTheDocument()
    expect(
      screen
        .getByTestId('controller-warm-up')
        .querySelector('[data-testid="toggle"]'),
    ).not.toBeInTheDocument()
    expect(
      screen
        .getByTestId('controller-sets')
        .querySelector('[data-testid="toggle"]'),
    ).not.toBeInTheDocument()
    expect(
      screen
        .getByTestId('controller-cycles')
        .querySelector('[data-testid="toggle"]'),
    ).not.toBeInTheDocument()
    expect(
      screen
        .getByTestId('controller-cycle-rest')
        .querySelector('[data-testid="toggle"]'),
    ).not.toBeInTheDocument()
  })

  it('should render scroll indicator elements', () => {
    render(
      <TimerControllers
        settings={defaultSettings}
        onSettingsChange={mockOnSettingsChange}
      />,
    )

    expect(
      screen.getByTestId('controller-prepare').closest('.timer-controllers'),
    ).toBeInTheDocument()
  })
})
