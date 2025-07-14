import { render, screen, fireEvent } from '@testing-library/react'
import { DoneButton } from '../../components/Dashboard/DoneButton'

describe('DoneButton', () => {
  it('should render button with correct text and aria-label', () => {
    const mockOnClick = jest.fn()

    render(<DoneButton onClick={mockOnClick} />)

    const button = screen.getByRole('button', { name: 'Done' })
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Done')
    expect(button).toHaveAttribute('aria-label', 'Done')
  })

  it('should have correct CSS classes', () => {
    const mockOnClick = jest.fn()

    render(<DoneButton onClick={mockOnClick} />)

    const container = screen.getByRole('button').parentElement
    expect(container).toHaveClass('done-button-container')

    const button = screen.getByRole('button')
    expect(button).toHaveClass('done-button')
  })

  it('should call onClick when button is clicked', () => {
    const mockOnClick = jest.fn()

    render(<DoneButton onClick={mockOnClick} />)

    const button = screen.getByRole('button', { name: 'Done' })
    fireEvent.click(button)

    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('should call onClick multiple times when clicked multiple times', () => {
    const mockOnClick = jest.fn()

    render(<DoneButton onClick={mockOnClick} />)

    const button = screen.getByRole('button', { name: 'Done' })

    fireEvent.click(button)
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockOnClick).toHaveBeenCalledTimes(3)
  })

  it('should be accessible for screen readers', () => {
    const mockOnClick = jest.fn()

    render(<DoneButton onClick={mockOnClick} />)

    const button = screen.getByRole('button', { name: 'Done' })
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('aria-label', 'Done')
  })
})
