import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { TimerDisplay } from '@/components/Dashboard/TimerDisplay'
import { TimerState } from '@/types/dashboard.types'

describe('TimerDisplay', () => {
  const baseTimerState: TimerState = {
    phase: 'work',
    currentTime: '01:30',
    totalTime: '05:00',
    currentSet: 2,
    totalSets: 5,
    currentCycle: 1,
    totalCycles: 3,
    isPlaying: false,
    isPaused: false,
  }

  it('should render all timer display elements', () => {
    render(<TimerDisplay timerState={baseTimerState} />)

    expect(screen.getByText('01:30')).toBeInTheDocument()
    expect(screen.getByText('05:00')).toBeInTheDocument()
    expect(screen.getByText('2/5')).toBeInTheDocument()
    expect(screen.getByText('SETS')).toBeInTheDocument()
    expect(screen.getByText('1/3')).toBeInTheDocument()
    expect(screen.getByText('CYCLES')).toBeInTheDocument()
  })

  it('should display current and total time correctly', () => {
    const timerState = {
      ...baseTimerState,
      currentTime: '02:45',
      totalTime: '10:30',
    }

    render(<TimerDisplay timerState={timerState} />)

    expect(screen.getByText('02:45')).toBeInTheDocument()
    expect(screen.getByText('10:30')).toBeInTheDocument()
  })

  it('should display sets progress correctly', () => {
    const timerState = {
      ...baseTimerState,
      currentSet: 3,
      totalSets: 8,
    }

    render(<TimerDisplay timerState={timerState} />)

    expect(screen.getByText('3/8')).toBeInTheDocument()
    expect(screen.getByText('SETS')).toBeInTheDocument()
  })

  it('should display cycles progress correctly', () => {
    const timerState = {
      ...baseTimerState,
      currentCycle: 2,
      totalCycles: 4,
    }

    render(<TimerDisplay timerState={timerState} />)

    expect(screen.getByText('2/4')).toBeInTheDocument()
    expect(screen.getByText('CYCLES')).toBeInTheDocument()
  })

  describe('Phase Colors', () => {
    it('should apply prepare phase color (#EA6418)', () => {
      const timerState = {
        ...baseTimerState,
        phase: 'prepare' as const,
      }

      render(<TimerDisplay timerState={timerState} />)

      const mainTimeElement = screen.getByText('01:30')
      expect(mainTimeElement).toHaveStyle('color: #EA6418')
    })

    it('should apply warmup phase color (#F2994A)', () => {
      const timerState = {
        ...baseTimerState,
        phase: 'warmup' as const,
      }

      render(<TimerDisplay timerState={timerState} />)

      const mainTimeElement = screen.getByText('01:30')
      expect(mainTimeElement).toHaveStyle('color: #F2994A')
    })

    it('should apply work phase color (#219653)', () => {
      const timerState = {
        ...baseTimerState,
        phase: 'work' as const,
      }

      render(<TimerDisplay timerState={timerState} />)

      const mainTimeElement = screen.getByText('01:30')
      expect(mainTimeElement).toHaveStyle('color: #219653')
    })

    it('should apply rest phase color (#EA6418)', () => {
      const timerState = {
        ...baseTimerState,
        phase: 'rest' as const,
      }

      render(<TimerDisplay timerState={timerState} />)

      const mainTimeElement = screen.getByText('01:30')
      expect(mainTimeElement).toHaveStyle('color: #EA6418')
    })

    it('should apply cycleRest phase color (#F2994A)', () => {
      const timerState = {
        ...baseTimerState,
        phase: 'cycleRest' as const,
      }

      render(<TimerDisplay timerState={timerState} />)

      const mainTimeElement = screen.getByText('01:30')
      expect(mainTimeElement).toHaveStyle('color: #F2994A')
    })

    it('should apply default color (#219653) for edge case', () => {
      // Test the default case by temporarily modifying the component's phase value
      const timerState = {
        ...baseTimerState,
        phase: undefined as unknown as TimerState['phase'],
      }

      render(<TimerDisplay timerState={timerState} />)

      const mainTimeElement = screen.getByText('01:30')
      expect(mainTimeElement).toHaveStyle('color: #219653')
    })
  })

  it('should handle zero values correctly', () => {
    const timerState = {
      ...baseTimerState,
      currentSet: 0,
      totalSets: 0,
      currentCycle: 0,
      totalCycles: 0,
    }

    render(<TimerDisplay timerState={timerState} />)

    // Both sets and cycles should show 0/0
    expect(screen.getAllByText('0/0')).toHaveLength(2) // One for sets, one for cycles
    expect(screen.getByText('SETS')).toBeInTheDocument()
    expect(screen.getByText('CYCLES')).toBeInTheDocument()
  })

  it('should handle large numbers correctly', () => {
    const timerState = {
      ...baseTimerState,
      currentSet: 999,
      totalSets: 1000,
      currentCycle: 99,
      totalCycles: 100,
    }

    render(<TimerDisplay timerState={timerState} />)

    expect(screen.getByText('999/1000')).toBeInTheDocument()
    expect(screen.getByText('99/100')).toBeInTheDocument()
  })

  it('should handle long time formats correctly', () => {
    const timerState = {
      ...baseTimerState,
      currentTime: '59:59',
      totalTime: '120:30',
    }

    render(<TimerDisplay timerState={timerState} />)

    expect(screen.getByText('59:59')).toBeInTheDocument()
    expect(screen.getByText('120:30')).toBeInTheDocument()
  })

  it('should have correct CSS classes for styling', () => {
    render(<TimerDisplay timerState={baseTimerState} />)

    expect(screen.getByText('01:30').closest('.main-time')).toBeInTheDocument()
    expect(screen.getByText('05:00').closest('.total-time')).toBeInTheDocument()
    expect(
      screen.getByText('SETS').closest('.progress-label'),
    ).toBeInTheDocument()
    expect(
      screen.getByText('CYCLES').closest('.progress-label'),
    ).toBeInTheDocument()
  })
})
