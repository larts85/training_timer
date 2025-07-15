import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { TimerActions } from '@/components/Dashboard/TimerActions'

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

describe('TimerActions', () => {
  const mockOnPlayPause = jest.fn()
  const mockOnStop = jest.fn()
  const mockOnNext = jest.fn()
  const mockOnPrevious = jest.fn()

  const defaultProps = {
    isPlaying: false,
    onPlayPause: mockOnPlayPause,
    onStop: mockOnStop,
    onNext: mockOnNext,
    onPrevious: mockOnPrevious,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render all action buttons', () => {
    render(<TimerActions {...defaultProps} />)

    expect(screen.getByLabelText('Play')).toBeInTheDocument()
    expect(screen.getByLabelText('Previous')).toBeInTheDocument()
    expect(screen.getByLabelText('Stop')).toBeInTheDocument()
    expect(screen.getByLabelText('Next')).toBeInTheDocument()
  })

  it('should show play icon when timer is not playing', () => {
    render(<TimerActions {...defaultProps} isPlaying={false} />)

    expect(screen.getByLabelText('Play')).toBeInTheDocument()
    expect(screen.getByAltText('Play')).toBeInTheDocument()
    expect(screen.queryByAltText('Pause')).not.toBeInTheDocument()
  })

  it('should show pause icon when timer is playing', () => {
    render(<TimerActions {...defaultProps} isPlaying={true} />)

    expect(screen.getByLabelText('Pause')).toBeInTheDocument()
    expect(screen.getByAltText('Pause')).toBeInTheDocument()
    expect(screen.queryByAltText('Play')).not.toBeInTheDocument()
  })

  it('should call onPlayPause when play/pause button is clicked', () => {
    render(<TimerActions {...defaultProps} />)

    const playButton = screen.getByLabelText('Play')
    fireEvent.click(playButton)

    expect(mockOnPlayPause).toHaveBeenCalledTimes(1)
  })

  it('should call onStop when stop button is clicked', () => {
    render(<TimerActions {...defaultProps} />)

    const stopButton = screen.getByLabelText('Stop')
    fireEvent.click(stopButton)

    expect(mockOnStop).toHaveBeenCalledTimes(1)
  })

  it('should call onNext when next button is clicked', () => {
    render(<TimerActions {...defaultProps} />)

    const nextButton = screen.getByLabelText('Next')
    fireEvent.click(nextButton)

    expect(mockOnNext).toHaveBeenCalledTimes(1)
  })

  it('should call onPrevious when previous button is clicked', () => {
    render(<TimerActions {...defaultProps} />)

    const previousButton = screen.getByLabelText('Previous')
    fireEvent.click(previousButton)

    expect(mockOnPrevious).toHaveBeenCalledTimes(1)
  })

  it('should have correct CSS classes for styling', () => {
    render(<TimerActions {...defaultProps} />)

    expect(screen.getByLabelText('Play').closest('.action-button')).toHaveClass(
      'play-pause-button',
    )
    expect(
      screen.getByLabelText('Previous').closest('.action-button'),
    ).toHaveClass('previous-button')
    expect(screen.getByLabelText('Stop').closest('.action-button')).toHaveClass(
      'stop-button',
    )
    expect(screen.getByLabelText('Next').closest('.action-button')).toHaveClass(
      'next-button',
    )
  })

  it('should display correct icons with proper dimensions', () => {
    render(<TimerActions {...defaultProps} />)

    // Play icon dimensions
    const playIcon = screen.getByAltText('Play')
    expect(playIcon).toHaveAttribute('width', '65')
    expect(playIcon).toHaveAttribute('height', '65')

    // Other icons dimensions
    const previousIcon = screen.getByAltText('Previous')
    expect(previousIcon).toHaveAttribute('width', '26')
    expect(previousIcon).toHaveAttribute('height', '26')

    const stopIcon = screen.getByAltText('Stop')
    expect(stopIcon).toHaveAttribute('width', '36')
    expect(stopIcon).toHaveAttribute('height', '36')

    const nextIcon = screen.getByAltText('Next')
    expect(nextIcon).toHaveAttribute('width', '26')
    expect(nextIcon).toHaveAttribute('height', '26')
  })

  it('should display pause icon with correct dimensions when playing', () => {
    render(<TimerActions {...defaultProps} isPlaying={true} />)

    const pauseIcon = screen.getByAltText('Pause')
    expect(pauseIcon).toHaveAttribute('width', '75')
    expect(pauseIcon).toHaveAttribute('height', '75')
  })

  it('should have proper accessibility attributes', () => {
    render(<TimerActions {...defaultProps} />)

    expect(screen.getByLabelText('Play')).toHaveAttribute('aria-label', 'Play')
    expect(screen.getByLabelText('Previous')).toHaveAttribute(
      'aria-label',
      'Previous',
    )
    expect(screen.getByLabelText('Stop')).toHaveAttribute('aria-label', 'Stop')
    expect(screen.getByLabelText('Next')).toHaveAttribute('aria-label', 'Next')
  })

  it('should update aria-label when switching between play and pause', () => {
    const { rerender } = render(
      <TimerActions {...defaultProps} isPlaying={false} />,
    )

    expect(screen.getByRole('button', { name: 'Play' })).toBeInTheDocument()

    rerender(<TimerActions {...defaultProps} isPlaying={true} />)

    expect(screen.getByRole('button', { name: 'Pause' })).toBeInTheDocument()
  })
})
