import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { TimerControllerRow } from '@/components/Dashboard/TimerControllerRow'
import { TimerControllerRowProps } from '@/types/dashboard.types'

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

describe('TimerControllerRow', () => {
  const defaultProps: TimerControllerRowProps = {
    name: 'Test Timer',
    value: '5',
    onValueChange: jest.fn(),
    hasToggle: false,
    isToggleOn: false,
    onToggleChange: jest.fn(),
    isNumberInput: false,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render basic controller row without toggle', () => {
    render(<TimerControllerRow {...defaultProps} />)

    expect(screen.getByText('Test Timer')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByLabelText('Increment Test Timer')).toBeInTheDocument()
    expect(screen.getByLabelText('Decrement Test Timer')).toBeInTheDocument()
    expect(
      screen.queryByLabelText('Toggle Test Timer reps mode'),
    ).not.toBeInTheDocument()
  })

  it('should render controller row with toggle when hasToggle is true', () => {
    const propsWithToggle = {
      ...defaultProps,
      hasToggle: true,
    }

    render(<TimerControllerRow {...propsWithToggle} />)

    expect(
      screen.getByLabelText('Toggle Test Timer reps mode'),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Toggle Test Timer reps mode' }),
    ).toBeInTheDocument()
  })

  it('should show reps icon when toggle is active', () => {
    const propsWithActiveToggle = {
      ...defaultProps,
      hasToggle: true,
      isToggleOn: true,
    }

    render(<TimerControllerRow {...propsWithActiveToggle} />)

    const toggleButton = screen.getByLabelText('Toggle Test Timer reps mode')
    expect(toggleButton).toHaveClass('active')
    expect(screen.getByAltText('Reps')).toBeInTheDocument()
  })

  it('should not show reps icon when toggle is inactive', () => {
    const propsWithInactiveToggle = {
      ...defaultProps,
      hasToggle: true,
      isToggleOn: false,
    }

    render(<TimerControllerRow {...propsWithInactiveToggle} />)

    const toggleButton = screen.getByLabelText('Toggle Test Timer reps mode')
    expect(toggleButton).not.toHaveClass('active')
    expect(screen.queryByAltText('Reps')).not.toBeInTheDocument()
  })

  it('should call onToggleChange when toggle button is clicked', () => {
    const mockOnToggleChange = jest.fn()
    const propsWithToggle = {
      ...defaultProps,
      hasToggle: true,
      isToggleOn: false,
      onToggleChange: mockOnToggleChange,
    }

    render(<TimerControllerRow {...propsWithToggle} />)

    const toggleButton = screen.getByLabelText('Toggle Test Timer reps mode')
    fireEvent.click(toggleButton)

    expect(mockOnToggleChange).toHaveBeenCalledWith(true)
  })

  it('should call onToggleChange with false when active toggle is clicked', () => {
    const mockOnToggleChange = jest.fn()
    const propsWithActiveToggle = {
      ...defaultProps,
      hasToggle: true,
      isToggleOn: true,
      onToggleChange: mockOnToggleChange,
    }

    render(<TimerControllerRow {...propsWithActiveToggle} />)

    const toggleButton = screen.getByLabelText('Toggle Test Timer reps mode')
    fireEvent.click(toggleButton)

    expect(mockOnToggleChange).toHaveBeenCalledWith(false)
  })

  describe('Number Input Mode', () => {
    const numberInputProps = {
      ...defaultProps,
      isNumberInput: true,
      value: '3',
    }

    it('should increment number value when increment button is clicked', () => {
      const mockOnValueChange = jest.fn()
      const props = {
        ...numberInputProps,
        onValueChange: mockOnValueChange,
      }

      render(<TimerControllerRow {...props} />)

      const incrementButton = screen.getByLabelText('Increment Test Timer')
      fireEvent.click(incrementButton)

      expect(mockOnValueChange).toHaveBeenCalledWith('4')
    })

    it('should decrement number value when decrement button is clicked', () => {
      const mockOnValueChange = jest.fn()
      const props = {
        ...numberInputProps,
        onValueChange: mockOnValueChange,
      }

      render(<TimerControllerRow {...props} />)

      const decrementButton = screen.getByLabelText('Decrement Test Timer')
      fireEvent.click(decrementButton)

      expect(mockOnValueChange).toHaveBeenCalledWith('2')
    })

    it('should not decrement below 0 for number input', () => {
      const mockOnValueChange = jest.fn()
      const props = {
        ...numberInputProps,
        value: '0',
        onValueChange: mockOnValueChange,
      }

      render(<TimerControllerRow {...props} />)

      const decrementButton = screen.getByLabelText('Decrement Test Timer')
      fireEvent.click(decrementButton)

      expect(mockOnValueChange).not.toHaveBeenCalled()
    })

    it('should handle invalid number values when incrementing', () => {
      const mockOnValueChange = jest.fn()
      const props = {
        ...numberInputProps,
        value: 'invalid',
        onValueChange: mockOnValueChange,
      }

      render(<TimerControllerRow {...props} />)

      const incrementButton = screen.getByLabelText('Increment Test Timer')
      fireEvent.click(incrementButton)

      expect(mockOnValueChange).toHaveBeenCalledWith('1')
    })

    it('should handle invalid number values when decrementing', () => {
      const mockOnValueChange = jest.fn()
      const props = {
        ...numberInputProps,
        value: 'invalid',
        onValueChange: mockOnValueChange,
      }

      render(<TimerControllerRow {...props} />)

      const decrementButton = screen.getByLabelText('Decrement Test Timer')
      fireEvent.click(decrementButton)

      expect(mockOnValueChange).not.toHaveBeenCalled()
    })
  })

  describe('Non-Number Input Mode', () => {
    const timeInputProps = {
      ...defaultProps,
      isNumberInput: false,
      value: '10:30',
    }

    it('should call onValueChange with same value for time increment (placeholder logic)', () => {
      const mockOnValueChange = jest.fn()
      const props = {
        ...timeInputProps,
        onValueChange: mockOnValueChange,
      }

      render(<TimerControllerRow {...props} />)

      const incrementButton = screen.getByLabelText('Increment Test Timer')
      fireEvent.click(incrementButton)

      expect(mockOnValueChange).toHaveBeenCalledWith('10:30')
    })

    it('should call onValueChange with same value for time decrement (placeholder logic)', () => {
      const mockOnValueChange = jest.fn()
      const props = {
        ...timeInputProps,
        onValueChange: mockOnValueChange,
      }

      render(<TimerControllerRow {...props} />)

      const decrementButton = screen.getByLabelText('Decrement Test Timer')
      fireEvent.click(decrementButton)

      expect(mockOnValueChange).toHaveBeenCalledWith('10:30')
    })
  })

  it('should handle missing onToggleChange callback gracefully', () => {
    const propsWithoutCallback = {
      ...defaultProps,
      hasToggle: true,
      onToggleChange: undefined,
    }

    render(<TimerControllerRow {...propsWithoutCallback} />)

    const toggleButton = screen.getByLabelText('Toggle Test Timer reps mode')

    expect(() => {
      fireEvent.click(toggleButton)
    }).not.toThrow()
  })

  it('should display correct images for increment and decrement buttons', () => {
    render(<TimerControllerRow {...defaultProps} />)

    expect(screen.getByAltText('Plus')).toBeInTheDocument()
    expect(screen.getByAltText('Minus')).toBeInTheDocument()
  })
})
